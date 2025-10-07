import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, company, industry } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !company || !industry) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        company,
        industry,
        plan: 'STARTER',
        creditBalance: 500, // Welcome bonus credits
        // Note: We'll add password field to schema later
        // password: hashedPassword,
      }
    });

    // Create business profile
    await prisma.businessProfile.create({
      data: {
        userId: user.id,
        businessName: company,
        industry: industry,
        description: `New ${industry} business looking to generate leads`,
        marketingGoals: ['Lead Generation', 'Customer Acquisition'],
        idealCustomerProfile: {
          industry: industry,
          companySize: 'Any',
          location: 'India',
          roles: ['Decision Makers', 'Influencers']
        }
      }
    });

    // Log welcome credits transaction
    await prisma.creditTransaction.create({
      data: {
        userId: user.id,
        type: 'BONUS',
        amount: 500,
        description: 'Welcome bonus credits for new account',
        metadata: { 
          source: 'account_creation',
          industry: industry,
          company: company
        }
      }
    });

    // Create welcome notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'success',
        title: 'Welcome to Transition Marketing AI! 🇮🇳',
        message: 'Your account has been created successfully. You have ₹500 credits to start generating leads.',
        actionUrl: '/dashboard'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        creditBalance: user.creditBalance
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
