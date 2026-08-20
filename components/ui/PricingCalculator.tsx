'use client';

import React, { useState, useMemo } from 'react';

const PRICING = {
  dropIn: 35,
  monthly: 220,
  tenPack: 300,
};

const PricingCalculator: React.FC = () => {
  const [classesPerWeek, setClassesPerWeek] = useState(3);

  // Calculate cost per class for each plan based on usage
  const calculations = useMemo(() => {
    const classesPerMonth = classesPerWeek * 4;

    return {
      dropIn: {
        totalCost: PRICING.dropIn * classesPerMonth,
        perClass: PRICING.dropIn,
        savings: 0,
      },
      monthly: {
        totalCost: PRICING.monthly,
        perClass: classesPerMonth > 0 ? PRICING.monthly / classesPerMonth : 0,
        savings: (PRICING.dropIn * classesPerMonth) - PRICING.monthly,
      },
      tenPack: {
        totalCost: PRICING.tenPack,
        perClass: PRICING.tenPack / 10,
        classesNeeded: 10,
        monthsCovered: classesPerMonth > 0 ? 10 / classesPerMonth : 0,
        savings: (PRICING.dropIn * 10) - PRICING.tenPack,
      },
    };
  }, [classesPerWeek]);

  // Determine best value
  const bestValue = useMemo(() => {
    const classesPerMonth = classesPerWeek * 4;

    if (classesPerMonth >= 8) return 'monthly';
    if (classesPerMonth >= 3) return 'tenPack';
    return 'dropIn';
  }, [classesPerWeek]);

  return (
    <div className="bg-cream-light border-2 border-burgundy-primary p-6 md:p-8">
      <div className="text-center mb-8">
        <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl uppercase tracking-wider text-burgundy-primary mb-2">
          Find Your Best Value
        </h3>
        <p className="text-charcoal-black/80 text-sm">
          See how much you save based on your training frequency
        </p>
      </div>

      {/* Slider Input */}
      <div className="mb-8">
        <label htmlFor="classes-per-week" className="block text-center mb-4">
          <span className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-burgundy-primary">
            How often will you train?
          </span>
        </label>

        <div className="max-w-md mx-auto">
          <input
            id="classes-per-week"
            type="range"
            min="1"
            max="7"
            step="1"
            value={classesPerWeek}
            onChange={(e) => setClassesPerWeek(Number(e.target.value))}
            className="w-full h-2 bg-burgundy-primary/20 rounded-lg appearance-none cursor-pointer accent-burgundy-primary"
            style={{
              background: `linear-gradient(to right, var(--burgundy-primary) 0%, var(--burgundy-primary) ${((classesPerWeek - 1) / 6) * 100}%, rgba(125, 30, 30, 0.2) ${((classesPerWeek - 1) / 6) * 100}%, rgba(125, 30, 30, 0.2) 100%)`
            }}
          />

          <div className="flex justify-between mt-2 text-xs text-charcoal-black/60">
            <span>1x/week</span>
            <span>7x/week</span>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-3xl font-bold text-burgundy-primary">
            {classesPerWeek} {classesPerWeek === 1 ? 'class' : 'classes'}
          </p>
          <p className="text-sm text-charcoal-black/70">
            per week = <strong className="text-burgundy-primary">{classesPerWeek * 4} classes/month</strong>
          </p>
        </div>
      </div>

      {/* Comparison Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Drop-In */}
        <div className={`p-4 border-2 ${bestValue === 'dropIn' ? 'border-blood-red bg-blood-red/5' : 'border-burgundy-primary/30 bg-white'}`}>
          {bestValue === 'dropIn' && (
            <div className="text-xs uppercase tracking-wide text-blood-red font-bold mb-2 flex items-center gap-1">
              <span>⭐</span> Best Value
            </div>
          )}
          <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-burgundy-primary mb-3">
            Drop-In
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-black/70">Cost/month:</span>
              <span className="font-bold text-burgundy-primary">${calculations.dropIn.totalCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-black/70">Per class:</span>
              <span className="font-bold">${calculations.dropIn.perClass}</span>
            </div>
            <div className="pt-2 border-t border-burgundy-primary/20">
              <p className="text-xs text-charcoal-black/60 italic">
                Pay as you go, no commitment
              </p>
            </div>
          </div>
        </div>

        {/* 10-Class Pack */}
        <div className={`p-4 border-2 ${bestValue === 'tenPack' ? 'border-blood-red bg-blood-red/5' : 'border-burgundy-primary/30 bg-white'}`}>
          {bestValue === 'tenPack' && (
            <div className="text-xs uppercase tracking-wide text-blood-red font-bold mb-2 flex items-center gap-1">
              <span>⭐</span> Best Value
            </div>
          )}
          <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-burgundy-primary mb-3">
            10-Class Pack
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-black/70">Total cost:</span>
              <span className="font-bold text-burgundy-primary">${calculations.tenPack.totalCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-black/70">Per class:</span>
              <span className="font-bold">${calculations.tenPack.perClass.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-black/70">Lasts:</span>
              <span className="font-bold">{calculations.tenPack.monthsCovered.toFixed(1)} months</span>
            </div>
            <div className="pt-2 border-t border-burgundy-primary/20">
              <p className="text-xs font-semibold text-green-700">
                Save ${calculations.tenPack.savings} vs Drop-In
              </p>
            </div>
          </div>
        </div>

        {/* Monthly Unlimited */}
        <div className={`p-4 border-2 ${bestValue === 'monthly' ? 'border-blood-red bg-blood-red/5' : 'border-burgundy-primary/30 bg-white'}`}>
          {bestValue === 'monthly' && (
            <div className="text-xs uppercase tracking-wide text-blood-red font-bold mb-2 flex items-center gap-1">
              <span>⭐</span> Best Value
            </div>
          )}
          <h4 className="font-[family-name:var(--font-ui)] text-lg uppercase tracking-wide text-burgundy-primary mb-3">
            Monthly Unlimited
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-charcoal-black/70">Cost/month:</span>
              <span className="font-bold text-burgundy-primary">${calculations.monthly.totalCost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-black/70">Per class:</span>
              <span className="font-bold">${calculations.monthly.perClass.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-black/70">Classes:</span>
              <span className="font-bold">Unlimited!</span>
            </div>
            <div className="pt-2 border-t border-burgundy-primary/20">
              <p className="text-xs font-semibold text-green-700">
                Save ${calculations.monthly.savings.toFixed(0)} vs Drop-In
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-6 p-4 bg-burgundy-primary/10 border border-burgundy-primary/30">
        <p className="text-sm text-center">
          <strong className="text-burgundy-primary">Our recommendation:</strong>{' '}
          {bestValue === 'monthly' && "Training 2+ times per week? Monthly Unlimited is your best value - unlimited classes for maximum flexibility."}
          {bestValue === 'tenPack' && "Training 1-2 times per week? The 10-Class Pack gives you great value with no monthly commitment."}
          {bestValue === 'dropIn' && "Just starting out? Drop-In lets you try classes at your own pace with zero commitment."}
        </p>
      </div>
    </div>
  );
};

export default PricingCalculator;
