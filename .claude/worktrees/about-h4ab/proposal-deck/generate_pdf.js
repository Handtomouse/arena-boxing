#!/usr/bin/env node

/**
 * PDF Generation Script for Arena Boxing Proposal
 *
 * This script uses Puppeteer to convert the HTML presentation
 * into a high-quality PDF document suitable for client sharing.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Load the HTML file
  const htmlPath = path.join(__dirname, 'index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  await page.setContent(htmlContent, {
    waitUntil: 'networkidle0'
  });

  // Set viewport for consistent rendering
  await page.setViewport({
    width: 794,  // A4 width in pixels at 96 DPI
    height: 1123 // A4 height in pixels at 96 DPI
  });

  console.log('📄 Rendering PDF...');

  // Generate PDF
  const pdfPath = path.join(__dirname, 'ARENA_BOXING_PROPOSAL.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    preferCSSPageSize: false
  });

  await browser.close();

  console.log('✅ PDF generated successfully!');
  console.log(`📍 Location: ${pdfPath}`);

  // Get file size
  const stats = fs.statSync(pdfPath);
  const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`📊 File size: ${fileSizeInMB} MB`);
}

generatePDF().catch(error => {
  console.error('❌ Error generating PDF:', error);
  process.exit(1);
});
