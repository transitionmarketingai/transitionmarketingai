"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  bonus: number;
  popular?: boolean;
}

export default function Credits() {
  const { user } = useAuth();
  const [userCredits, setUserCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  const packages: CreditPackage[] = [
    {
      id: 'starter',
      credits: 100,
      price: 500,
      bonus: 0,
    },
    {
      id: 'growth',
      credits: 500,
      price: 2000,
      bonus: 50,
      popular: true,
    },
    {
      id: 'pro',
      credits: 1000,
      price: 3500,
      bonus: 150,
    },
    {
      id: 'enterprise',
      credits: 2500,
      price: 7500,
      bonus: 500,
    },
  ];

  useEffect(() => {
    fetchUserCredits();
  }, [user]);

  const fetchUserCredits = async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching credits:', error);
        return;
      }
      
      if (data) {
        setUserCredits(data.credits || 0);
      }
    } catch (error) {
      console.error('Error in fetchUserCredits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (pkg: CreditPackage) => {
    setPurchasing(true);
    toast.loading('Initiating payment...', { id: 'purchase' });

    try {
      // TODO: Integrate Razorpay here
      // For now, simulate payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add credits to user account
      const totalCredits = pkg.credits + pkg.bonus;
      const { error } = await supabase
        .from('profiles')
        .update({ credits: userCredits + totalCredits })
        .eq('id', user?.id);
      
      if (error) {
        throw error;
      }
      
      // Record transaction
      await supabase.from('credit_transactions').insert({
        user_id: user?.id,
        amount: totalCredits,
        type: 'purchase',
        description: `Purchased ${pkg.credits} credits${pkg.bonus > 0 ? ` + ${pkg.bonus} bonus` : ''}`,
        reference_id: `purchase_${Date.now()}`,
      });
      
      setUserCredits(userCredits + totalCredits);
      toast.success(`${totalCredits} credits added to your account! 🎉`, { id: 'purchase' });
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Payment failed. Please try again.', { id: 'purchase' });
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/dashboard" className="text-blue-600 hover:underline mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Top Up Credits</h1>
          <p className="text-xl text-gray-600 mb-6">
            Unlock more leads and grow your business faster
          </p>
          
          {/* Current Balance */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg">
            <span className="text-lg">Your Balance:</span>
            <span className="text-3xl font-bold">{userCredits}</span>
            <span className="text-lg">Credits</span>
          </div>
        </div>

        {/* Pricing Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">How Credits Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🔓</div>
              <div className="font-bold text-gray-900 mb-1">5 Credits</div>
              <div className="text-sm text-gray-600">= 1 Lead Unlock</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">∞</div>
              <div className="font-bold text-gray-900 mb-1">FREE</div>
              <div className="text-sm text-gray-600">Lead Previews</div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4 text-center">
            Preview unlimited leads for FREE • Only pay to unlock full contact information
          </p>
        </div>

        {/* Credit Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-xl shadow-lg p-6 border-2 transition-all hover:shadow-2xl hover:-translate-y-1 ${
                pkg.popular ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">
                  {pkg.credits + pkg.bonus}
                </div>
                <div className="text-gray-600 text-sm">Credits</div>
                {pkg.bonus > 0 && (
                  <div className="mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold inline-block">
                    +{pkg.bonus} Bonus!
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  ₹{pkg.price.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  ₹{(pkg.price / (pkg.credits + pkg.bonus)).toFixed(2)} per credit
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{Math.floor((pkg.credits + pkg.bonus) / 5)} Lead Unlocks</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Unlimited Previews</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Never Expires</span>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(pkg)}
                disabled={purchasing}
                className={`w-full px-6 py-3 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  pkg.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {purchasing ? 'Processing...' : 'Purchase Now'}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Do credits expire?</h4>
              <p className="text-gray-600">
                No! Credits never expire. Buy once and use them whenever you need.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Can I get a refund?</h4>
              <p className="text-gray-600">
                We offer a 7-day money-back guarantee if you're not satisfied with the lead quality.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600">
                We accept all major credit/debit cards, UPI, net banking, and wallets via Razorpay.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Do you offer bulk discounts?</h4>
              <p className="text-gray-600">
                Yes! Larger packages come with bonus credits. Contact us for enterprise pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

