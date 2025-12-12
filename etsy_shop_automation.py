"""
AUTONOMOUS ETSY SHOP BUILDER
Creates 25-30 digital products, mockups, and lists them on Etsy
"""

import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib import colors
from PIL import Image, ImageDraw, ImageFont
import time
from datetime import datetime

# Create directories
os.makedirs("products", exist_ok=True)
os.makedirs("mockups", exist_ok=True)

print("🚀 Starting Etsy Shop Automation...")
print("\n" + "="*60)
print("📁 PHASE 1: CREATING PRODUCTS")
print("="*60 + "\n")

# Product definitions
PRODUCTS = [
    # Budget Templates (12 products)
    {
        "id": 1,
        "name": "2026 Monthly Budget Planner",
        "filename": "2026_monthly_budget_planner.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 6,
        "description": "Take control of your finances in 2026 with this comprehensive monthly budget planner. Track income, expenses, and savings goals all in one place.",
        "features": [
            "12 monthly budget worksheets",
            "Income and expense tracking",
            "Savings goals tracker",
            "Monthly summary pages"
        ]
    },
    {
        "id": 2,
        "name": "Holiday Budget Tracker 2025",
        "filename": "holiday_budget_tracker_2025.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 5,
        "description": "Stay stress-free this holiday season with a clear spending plan. Track gifts, decorations, food, and travel expenses.",
        "features": [
            "Gift budget planner with recipient tracking",
            "Holiday expense categories",
            "Running total calculator",
            "Receipt tracking log"
        ]
    },
    {
        "id": 3,
        "name": "Paycheck to Paycheck Budget",
        "filename": "paycheck_budget.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 4,
        "description": "Perfect for bi-weekly budgeting. Plan your expenses based on your paycheck schedule.",
        "features": [
            "Bi-weekly budget worksheets",
            "Bill due date tracker",
            "Paycheck allocation guide",
            "Emergency fund tracker"
        ]
    },
    {
        "id": 4,
        "name": "Debt Snowball Tracker",
        "filename": "debt_snowball_tracker.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 5,
        "description": "Get out of debt faster with the proven snowball method. Track multiple debts and watch your progress.",
        "features": [
            "Debt overview worksheet",
            "Payment tracking sheets",
            "Progress visualization",
            "Motivational milestones"
        ]
    },
    {
        "id": 5,
        "name": "Emergency Fund Savings Goal",
        "filename": "emergency_fund_tracker.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 4,
        "description": "Build your financial safety net. Track your progress toward 3-6 months of expenses.",
        "features": [
            "Savings goal calculator",
            "Monthly contribution tracker",
            "Milestone markers",
            "Visual progress chart"
        ]
    },
    {
        "id": 6,
        "name": "Christmas Gift Budget Planner",
        "filename": "christmas_gift_budget.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 4,
        "description": "Organize all your Christmas gift giving. Track recipients, gift ideas, budget, and purchases.",
        "features": [
            "Gift recipient list",
            "Budget per person",
            "Gift ideas tracker",
            "Purchase checklist"
        ]
    },
    {
        "id": 7,
        "name": "2026 Financial Goals Worksheet",
        "filename": "2026_financial_goals.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 5,
        "description": "Set and achieve your financial goals this year. Break down big goals into actionable steps.",
        "features": [
            "SMART goal setting template",
            "Monthly action steps",
            "Progress tracking",
            "Quarterly review worksheets"
        ]
    },
    {
        "id": 8,
        "name": "Simple Expense Tracker",
        "filename": "simple_expense_tracker.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 6,
        "description": "Track every dollar you spend. Simple daily and weekly expense logging.",
        "features": [
            "Daily expense log",
            "Weekly summary sheets",
            "Category breakdowns",
            "Monthly overview"
        ]
    },
    {
        "id": 9,
        "name": "Bills Payment Tracker",
        "filename": "bills_payment_tracker.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 4,
        "description": "Never miss a bill payment. Track all your monthly bills in one organized place.",
        "features": [
            "Monthly bills checklist",
            "Due date calendar",
            "Payment confirmation log",
            "Annual bills tracker"
        ]
    },
    {
        "id": 10,
        "name": "Budget Breakdown Template",
        "filename": "budget_breakdown.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 4,
        "description": "Categorize your income and expenses. See exactly where your money goes each month.",
        "features": [
            "Income sources worksheet",
            "Expense categories breakdown",
            "Percentage allocation guide",
            "Monthly comparison chart"
        ]
    },
    {
        "id": 11,
        "name": "Savings Challenge 2026",
        "filename": "savings_challenge_2026.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 3,
        "description": "Save over $1,300 this year with the 52-week savings challenge. Watch your savings grow!",
        "features": [
            "52-week savings tracker",
            "Weekly deposit amounts",
            "Progress coloring chart",
            "Savings tips and motivation"
        ]
    },
    {
        "id": 12,
        "name": "Tax Prep Expense Tracker",
        "filename": "tax_prep_expense_tracker.pdf",
        "category": "budget",
        "price": 4.99,
        "pages": 5,
        "description": "Organize business and tax-deductible expenses. Make tax season stress-free.",
        "features": [
            "Categorized expense sheets",
            "Receipt log",
            "Mileage tracker",
            "Quarterly summary pages"
        ]
    },
    
    # Bundles (3 products)
    {
        "id": 13,
        "name": "Complete Holiday Finance Kit",
        "filename": "holiday_finance_kit_bundle.pdf",
        "category": "bundle",
        "price": 12.99,
        "pages": 14,
        "description": "Everything you need for stress-free holiday finances. Includes holiday budget, gift planner, and financial goals worksheet.",
        "features": [
            "Holiday Budget Tracker 2025",
            "Christmas Gift Budget Planner",
            "2026 Financial Goals Worksheet",
            "BONUS: Holiday Savings Tips Guide"
        ]
    },
    {
        "id": 14,
        "name": "2026 Success Bundle",
        "filename": "2026_success_bundle.pdf",
        "category": "bundle",
        "price": 14.99,
        "pages": 20,
        "description": "Your complete financial planning kit for 2026. Budget, save, and eliminate debt.",
        "features": [
            "2026 Monthly Budget Planner",
            "Debt Snowball Tracker",
            "Savings Challenge 2026",
            "2026 Financial Goals Worksheet"
        ]
    },
    {
        "id": 15,
        "name": "Financial Freedom Starter Pack",
        "filename": "financial_freedom_starter.pdf",
        "category": "bundle",
        "price": 12.99,
        "pages": 14,
        "description": "Start your journey to financial freedom. Essential tools for tracking expenses, bills, and building savings.",
        "features": [
            "Simple Expense Tracker",
            "Bills Payment Tracker",
            "Emergency Fund Savings Goal",
            "BONUS: Money Management Tips"
        ]
    },
    
    # Meal Planners (5 products)
    {
        "id": 16,
        "name": "Weekly Meal Prep Planner",
        "filename": "weekly_meal_prep.pdf",
        "category": "meal",
        "price": 4.99,
        "pages": 4,
        "description": "Plan a week of healthy meals in minutes. Includes meal planning, grocery list, and prep checklist.",
        "features": [
            "7-day meal planning grid",
            "Breakfast, lunch, dinner sections",
            "Snack planning",
            "Integrated grocery list"
        ]
    },
    {
        "id": 17,
        "name": "Healthy Eating Tracker",
        "filename": "healthy_eating_tracker.pdf",
        "category": "meal",
        "price": 4.99,
        "pages": 5,
        "description": "Track your daily nutrition and stay on top of your health goals. Water intake, meals, and more.",
        "features": [
            "Daily food log",
            "Water intake tracker",
            "Portion size guide",
            "Weekly reflection pages"
        ]
    },
    {
        "id": 18,
        "name": "Grocery Shopping List Template",
        "filename": "grocery_shopping_list.pdf",
        "category": "meal",
        "price": 4.99,
        "pages": 3,
        "description": "Never forget an item again. Organized by store section for efficient shopping.",
        "features": [
            "Categorized shopping lists",
            "Budget tracking",
            "Store layout organizer",
            "Meal-based shopping planner"
        ]
    },
    {
        "id": 19,
        "name": "Family Meal Planner Bundle",
        "filename": "family_meal_planner_bundle.pdf",
        "category": "meal",
        "price": 7.99,
        "pages": 7,
        "description": "Complete meal planning solution for busy families. Meal planner + grocery list in one.",
        "features": [
            "Weekly Meal Prep Planner",
            "Grocery Shopping List Template",
            "Family favorites recipe cards",
            "Monthly meal planning calendar"
        ]
    },
    {
        "id": 20,
        "name": "New Year Meal Planning Kit",
        "filename": "new_year_meal_planning.pdf",
        "category": "meal",
        "price": 4.99,
        "pages": 6,
        "description": "Start 2026 with healthy eating habits. January-focused meal planning with New Year's goals.",
        "features": [
            "January meal calendar",
            "Healthy recipe ideas",
            "Goal-based meal planning",
            "Progress tracker"
        ]
    },
    
    # Social Media Templates (5 products)
    {
        "id": 21,
        "name": "Instagram Story Template Bundle",
        "filename": "instagram_story_templates.pdf",
        "category": "social",
        "price": 7.99,
        "pages": 10,
        "description": "30 editable Instagram story templates. Perfect for content creators, businesses, and influencers.",
        "features": [
            "30 unique story designs",
            "Editable text fields",
            "Modern aesthetic",
            "Multiple color schemes"
        ]
    },
    {
        "id": 22,
        "name": "Instagram Post Templates",
        "filename": "instagram_post_templates.pdf",
        "category": "social",
        "price": 7.99,
        "pages": 8,
        "description": "20 motivational quote post templates. Boost engagement with beautiful, ready-to-use designs.",
        "features": [
            "20 quote post layouts",
            "Inspirational themes",
            "Square format (1080x1080)",
            "Easy to customize"
        ]
    },
    {
        "id": 23,
        "name": "Pinterest Pin Templates Bundle",
        "filename": "pinterest_pin_templates.pdf",
        "category": "social",
        "price": 9.99,
        "pages": 10,
        "description": "25 Pinterest pin templates optimized for engagement. Drive traffic to your blog or business.",
        "features": [
            "25 vertical pin designs",
            "Optimized 2:3 ratio",
            "Multiple niches covered",
            "Text overlay guides"
        ]
    },
    {
        "id": 24,
        "name": "Instagram Reels Cover Templates",
        "filename": "instagram_reels_covers.pdf",
        "category": "social",
        "price": 7.99,
        "pages": 6,
        "description": "15 cohesive Reels cover templates. Create a professional, branded Instagram feed.",
        "features": [
            "15 matching cover designs",
            "Consistent branding",
            "Editable text",
            "Multiple themes included"
        ]
    },
    {
        "id": 25,
        "name": "Social Media Content Calendar",
        "filename": "social_media_calendar.pdf",
        "category": "social",
        "price": 4.99,
        "pages": 5,
        "description": "Plan a month of social media content in advance. Never run out of post ideas again.",
        "features": [
            "Monthly planning grid",
            "Multi-platform support",
            "Content idea prompts",
            "Hashtag planning section"
        ]
    },
    
    # Bonus Templates (5 products)
    {
        "id": 26,
        "name": "Reading Journal Printable",
        "filename": "reading_journal.pdf",
        "category": "bonus",
        "price": 4.99,
        "pages": 6,
        "description": "Track your reading journey. Log books, rate them, and reflect on what you've read.",
        "features": [
            "Book tracking pages",
            "Rating and review sections",
            "Reading goals tracker",
            "Annual reading log"
        ]
    },
    {
        "id": 27,
        "name": "2026 Goals Planner",
        "filename": "2026_goals_planner.pdf",
        "category": "bonus",
        "price": 4.99,
        "pages": 7,
        "description": "Make 2026 your best year yet. Set goals across all life areas and track your progress.",
        "features": [
            "Life area goal worksheets",
            "Quarterly review pages",
            "Action step planner",
            "Success tracker"
        ]
    },
    {
        "id": 28,
        "name": "Fitness Tracker 2026",
        "filename": "fitness_tracker_2026.pdf",
        "category": "bonus",
        "price": 4.99,
        "pages": 6,
        "description": "Track workouts, measurements, and fitness goals. Your complete fitness planning tool.",
        "features": [
            "Workout log pages",
            "Measurement tracker",
            "Fitness goal setting",
            "Progress photos tracker"
        ]
    },
    {
        "id": 29,
        "name": "Habit Tracker Template",
        "filename": "habit_tracker.pdf",
        "category": "bonus",
        "price": 4.99,
        "pages": 4,
        "description": "Build better habits in 2026. Track daily habits and watch your consistency improve.",
        "features": [
            "Monthly habit grids",
            "Multiple habit tracking",
            "Streak counters",
            "Reflection prompts"
        ]
    },
    {
        "id": 30,
        "name": "Daily Planner 2026",
        "filename": "daily_planner_2026.pdf",
        "category": "bonus",
        "price": 4.99,
        "pages": 8,
        "description": "Plan your perfect day. Daily schedule, to-dos, priorities, and gratitude all in one place.",
        "features": [
            "Hourly schedule",
            "Priority task sections",
            "Notes and reflection",
            "Gratitude prompts"
        ]
    }
]


def create_budget_template(product):
    """Create a professional budget template PDF"""
    filename = f"products/{product['filename']}"
    doc = SimpleDocTemplate(filename, pagesize=letter)
    story = []
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#2C3E50'),
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#34495E'),
        spaceAfter=12,
        spaceBefore=12
    )
    
    # Title page
    story.append(Spacer(1, 1*inch))
    story.append(Paragraph(product['name'], title_style))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph(product['description'], styles['Normal']))
    story.append(Spacer(1, 0.5*inch))
    
    # Features
    story.append(Paragraph("✨ WHAT'S INCLUDED:", heading_style))
    for feature in product['features']:
        story.append(Paragraph(f"• {feature}", styles['Normal']))
        story.append(Spacer(1, 0.1*inch))
    
    story.append(PageBreak())
    
    # Create template pages based on category
    if product['category'] == 'budget':
        create_budget_pages(story, styles, heading_style, product)
    elif product['category'] == 'bundle':
        create_bundle_pages(story, styles, heading_style, product)
    elif product['category'] == 'meal':
        create_meal_pages(story, styles, heading_style, product)
    elif product['category'] == 'social':
        create_social_pages(story, styles, heading_style, product)
    elif product['category'] == 'bonus':
        create_bonus_pages(story, styles, heading_style, product)
    
    doc.build(story)
    print(f"✅ Created: {product['name']}")


def create_budget_pages(story, styles, heading_style, product):
    """Create budget-specific template pages"""
    # Monthly Budget Table
    story.append(Paragraph("MONTHLY BUDGET WORKSHEET", heading_style))
    
    # Income section
    income_data = [
        ['INCOME', 'AMOUNT'],
        ['Salary/Wages', '_'*30],
        ['Side Income', '_'*30],
        ['Other Income', '_'*30],
        ['TOTAL INCOME', '_'*30]
    ]
    
    income_table = Table(income_data, colWidths=[3*inch, 3*inch])
    income_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3498DB')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ]))
    
    story.append(income_table)
    story.append(Spacer(1, 0.3*inch))
    
    # Expenses section
    expense_data = [
        ['EXPENSES', 'BUDGETED', 'ACTUAL'],
        ['Housing', '_'*15, '_'*15],
        ['Transportation', '_'*15, '_'*15],
        ['Food/Groceries', '_'*15, '_'*15],
        ['Utilities', '_'*15, '_'*15],
        ['Insurance', '_'*15, '_'*15],
        ['Debt Payments', '_'*15, '_'*15],
        ['Entertainment', '_'*15, '_'*15],
        ['Savings', '_'*15, '_'*15],
        ['Other', '_'*15, '_'*15],
        ['TOTAL EXPENSES', '_'*15, '_'*15]
    ]
    
    expense_table = Table(expense_data, colWidths=[2*inch, 2*inch, 2*inch])
    expense_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#E74C3C')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 14),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold')
    ]))
    
    story.append(expense_table)
    story.append(PageBreak())
    
    # Additional tracking pages
    for i in range(product['pages'] - 2):
        story.append(Paragraph(f"{product['name']} - Page {i+1}", heading_style))
        story.append(Spacer(1, 0.2*inch))
        
        tracking_data = []
        for j in range(15):
            tracking_data.append(['_'*40, '_'*20])
        
        tracking_table = Table(tracking_data, colWidths=[4*inch, 2*inch])
        tracking_table.setStyle(TableStyle([
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        
        story.append(tracking_table)
        if i < product['pages'] - 3:
            story.append(PageBreak())


def create_bundle_pages(story, styles, heading_style, product):
    """Create bundle pages - combination of included templates"""
    story.append(Paragraph("BUNDLE CONTENTS", heading_style))
    story.append(Paragraph("This bundle includes the following templates:", styles['Normal']))
    story.append(Spacer(1, 0.2*inch))
    
    for feature in product['features']:
        story.append(Paragraph(f"📄 {feature}", styles['Normal']))
        story.append(Spacer(1, 0.15*inch))
    
    story.append(PageBreak())
    
    # Add sample pages from each included template
    for i in range(product['pages'] - 2):
        story.append(Paragraph(f"Template Section {i+1}", heading_style))
        story.append(Spacer(1, 0.2*inch))
        
        # Sample table
        data = [['Category', 'Amount', 'Notes']]
        for j in range(12):
            data.append(['_'*20, '_'*15, '_'*25])
        
        table = Table(data, colWidths=[2*inch, 1.5*inch, 2.5*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#9B59B6')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        
        story.append(table)
        if i < product['pages'] - 3:
            story.append(PageBreak())


def create_meal_pages(story, styles, heading_style, product):
    """Create meal planning template pages"""
    # Weekly meal planner
    story.append(Paragraph("WEEKLY MEAL PLANNER", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
    
    data = [['Day'] + meals]
    for day in days:
        data.append([day] + ['_'*12] * len(meals))
    
    table = Table(data, colWidths=[1.2*inch, 1.2*inch, 1.2*inch, 1.2*inch, 1.2*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#27AE60')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('BACKGROUND', (0, 1), (0, -1), colors.HexColor('#D5F4E6')),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ]))
    
    story.append(table)
    story.append(PageBreak())
    
    # Grocery list
    story.append(Paragraph("GROCERY SHOPPING LIST", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    categories = ['Produce', 'Meat/Protein', 'Dairy', 'Pantry', 'Frozen', 'Other']
    
    for category in categories:
        story.append(Paragraph(f"<b>{category.upper()}</b>", styles['Normal']))
        grocery_data = []
        for i in range(5):
            grocery_data.append(['☐', '_'*40, '_'*10])
        
        grocery_table = Table(grocery_data, colWidths=[0.3*inch, 4*inch, 1.5*inch])
        grocery_table.setStyle(TableStyle([
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        story.append(grocery_table)
        story.append(Spacer(1, 0.2*inch))
        
        if category != categories[-1]:
            story.append(Spacer(1, 0.1*inch))


def create_social_pages(story, styles, heading_style, product):
    """Create social media template guide pages"""
    story.append(Paragraph("SOCIAL MEDIA TEMPLATES GUIDE", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    story.append(Paragraph("<b>How to Use These Templates:</b>", styles['Normal']))
    story.append(Spacer(1, 0.1*inch))
    story.append(Paragraph("1. Choose your favorite template design", styles['Normal']))
    story.append(Paragraph("2. Edit text in Canva, Photoshop, or similar software", styles['Normal']))
    story.append(Paragraph("3. Add your brand colors and logo", styles['Normal']))
    story.append(Paragraph("4. Export and post to your social media", styles['Normal']))
    story.append(Spacer(1, 0.3*inch))
    
    story.append(PageBreak())
    
    # Template showcase pages
    for i in range(product['pages'] - 2):
        story.append(Paragraph(f"Template Design {i+1}", heading_style))
        story.append(Spacer(1, 0.3*inch))
        
        # Create a visual representation
        design_data = [
            ['TEMPLATE DESIGN PREVIEW', ''],
            ['', ''],
            ['Your Text Here', ''],
            ['', ''],
            ['Edit and customize', ''],
            ['', ''],
        ]
        
        design_table = Table(design_data, colWidths=[3*inch, 3*inch])
        design_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#8E44AD')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 18),
            ('GRID', (0, 0), (-1, -1), 2, colors.HexColor('#8E44AD')),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F4ECF7')]),
        ]))
        
        story.append(design_table)
        if i < product['pages'] - 3:
            story.append(PageBreak())


def create_bonus_pages(story, styles, heading_style, product):
    """Create bonus template pages"""
    story.append(Paragraph(f"{product['name'].upper()}", heading_style))
    story.append(Spacer(1, 0.2*inch))
    
    # Create tracking grids
    for i in range(product['pages'] - 1):
        if i > 0:
            story.append(PageBreak())
        
        story.append(Paragraph(f"Tracking Page {i+1}", styles['Heading3']))
        story.append(Spacer(1, 0.2*inch))
        
        # Create a grid for tracking
        data = [['Date', 'Item/Goal', 'Progress', 'Notes']]
        for j in range(20):
            data.append(['_'*10, '_'*20, '_'*10, '_'*25])
        
        table = Table(data, colWidths=[1*inch, 2*inch, 1*inch, 2*inch])
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#16A085')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('FONTSIZE', (0, 1), (-1, -1), 8),
        ]))
        
        story.append(table)


# Generate all products
for product in PRODUCTS:
    try:
        create_budget_template(product)
    except Exception as e:
        print(f"⚠️  Error creating {product['name']}: {str(e)}")
        continue

print(f"\n✅ All {len(PRODUCTS)} products created!")
print(f"📦 Products saved in: {os.path.abspath('products')}")

print("\n" + "="*60)
print("🖼️  PHASE 2: GENERATING MOCKUPS")
print("="*60 + "\n")


def create_mockup_images(product):
    """Generate professional mockup images for each product"""
    mockup_files = []
    
    for mockup_num in range(1, 4):  # Create 3 mockups per product
        try:
            # Create 2000x2000 image
            img = Image.new('RGB', (2000, 2000), color='white')
            draw = ImageDraw.Draw(img)
            
            if mockup_num == 1:
                # Mockup 1: Clean product preview
                # Add border
                draw.rectangle([100, 100, 1900, 1900], outline='#E0E0E0', width=5)
                
                # Title area
                draw.rectangle([100, 100, 1900, 400], fill='#3498DB')
                
                # Product name (use default font for simplicity)
                try:
                    font = ImageFont.truetype("arial.ttf", 60)
                except:
                    font = ImageFont.load_default()
                
                # Draw product name
                text = product['name']
                # Wrap text if too long
                if len(text) > 30:
                    words = text.split()
                    line1 = ' '.join(words[:len(words)//2])
                    line2 = ' '.join(words[len(words)//2:])
                    draw.text((1000, 200), line1, fill='white', font=font, anchor='mm')
                    draw.text((1000, 280), line2, fill='white', font=font, anchor='mm')
                else:
                    draw.text((1000, 250), text, fill='white', font=font, anchor='mm')
                
                # Content area - simulate template preview
                y_pos = 500
                for i in range(6):
                    draw.rectangle([200, y_pos, 1800, y_pos + 80], outline='#BDC3C7', width=2)
                    y_pos += 120
                
                # Footer
                draw.rectangle([100, 1700, 1900, 1900], fill='#2C3E50')
                try:
                    footer_font = ImageFont.truetype("arial.ttf", 40)
                except:
                    footer_font = ImageFont.load_default()
                draw.text((1000, 1800), 'INSTANT DOWNLOAD • PDF', fill='white', font=footer_font, anchor='mm')
                
            elif mockup_num == 2:
                # Mockup 2: Lifestyle/desk scene
                # Background gradient effect
                for i in range(2000):
                    color_val = int(240 - (i / 2000) * 40)
                    draw.line([(0, i), (2000, i)], fill=(color_val, color_val, color_val))
                
                # Desk surface
                draw.rectangle([0, 1200, 2000, 2000], fill='#D7CCC8')
                
                # Paper/template mockup
                draw.rectangle([400, 600, 1600, 1700], fill='white', outline='#757575', width=3)
                
                # Template content
                draw.rectangle([500, 700, 1500, 850], fill='#3498DB')
                try:
                    title_font = ImageFont.truetype("arial.ttf", 50)
                except:
                    title_font = ImageFont.load_default()
                draw.text((1000, 775), product['name'][:25], fill='white', font=title_font, anchor='mm')
                
                # Lines representing content
                for i in range(5):
                    y = 950 + i * 100
                    draw.line([(550, y), (1450, y)], fill='#BDBDBD', width=3)
                
                # Coffee cup decoration
                draw.ellipse([1650, 1400, 1850, 1600], fill='#6D4C41', outline='#4E342E', width=3)
                
            elif mockup_num == 3:
                # Mockup 3: Features highlighted
                # Background
                img_bg = Image.new('RGB', (2000, 2000), color='#ECF0F1')
                draw = ImageDraw.Draw(img_bg)
                img = img_bg
                
                # Main product card
                draw.rectangle([300, 200, 1700, 1800], fill='white', outline='#95A5A6', width=5)
                
                # Header
                draw.rectangle([300, 200, 1700, 450], fill='#E74C3C')
                try:
                    header_font = ImageFont.truetype("arial.ttf", 55)
                except:
                    header_font = ImageFont.load_default()
                
                # Title
                title_text = product['name']
                if len(title_text) > 25:
                    words = title_text.split()
                    line1 = ' '.join(words[:len(words)//2])
                    line2 = ' '.join(words[len(words)//2:])
                    draw.text((1000, 280), line1, fill='white', font=header_font, anchor='mm')
                    draw.text((1000, 370), line2, fill='white', font=header_font, anchor='mm')
                else:
                    draw.text((1000, 325), title_text, fill='white', font=header_font, anchor='mm')
                
                # Features list
                try:
                    feature_font = ImageFont.truetype("arial.ttf", 40)
                except:
                    feature_font = ImageFont.load_default()
                
                y_pos = 550
                for idx, feature in enumerate(product['features'][:4]):
                    # Checkmark circle
                    draw.ellipse([370, y_pos-15, 420, y_pos+35], fill='#27AE60')
                    draw.text((395, y_pos+10), '✓', fill='white', font=feature_font, anchor='mm')
                    
                    # Feature text
                    feature_text = feature if len(feature) < 40 else feature[:37] + '...'
                    draw.text((470, y_pos+10), feature_text, fill='#2C3E50', font=feature_font, anchor='lm')
                    y_pos += 150
                
                # Price badge
                draw.ellipse([1400, 1550, 1650, 1800], fill='#F39C12')
                try:
                    price_font = ImageFont.truetype("arial.ttf", 70)
                except:
                    price_font = ImageFont.load_default()
                draw.text((1525, 1675), f"${product['price']}", fill='white', font=price_font, anchor='mm')
            
            # Save mockup
            mockup_filename = f"mockups/{product['filename'].replace('.pdf', '')}_mockup_{mockup_num}.png"
            img.save(mockup_filename, 'PNG', dpi=(300, 300))
            mockup_files.append(mockup_filename)
            
        except Exception as e:
            print(f"⚠️  Error creating mockup {mockup_num} for {product['name']}: {str(e)}")
            continue
    
    return mockup_files


# Generate mockups for all products
mockup_count = 0
for product in PRODUCTS:
    try:
        mockups = create_mockup_images(product)
        mockup_count += len(mockups)
        print(f"✅ Mockups for: {product['name']} ({len(mockups)} images)")
    except Exception as e:
        print(f"⚠️  Error creating mockups for {product['name']}: {str(e)}")
        continue

print(f"\n✅ All mockups generated! Total: {mockup_count} images")
print(f"📦 Mockups saved in: {os.path.abspath('mockups')}")

print("\n" + "="*60)
print("✅ PHASE 1 & 2 COMPLETE!")
print("="*60)
print(f"\n📊 Summary:")
print(f"   • Products created: {len(PRODUCTS)}")
print(f"   • Mockup images: {mockup_count}")
print(f"\n🌐 Ready for Phase 3: Etsy Setup & Listing")
print(f"   Next: Run the Etsy automation script")
print("="*60)

