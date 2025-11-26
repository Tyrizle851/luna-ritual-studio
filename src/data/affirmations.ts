import affirmationRest from "@/assets/affirmation-rest.jpg";
import affirmationJoy from "@/assets/affirmation-joy.jpg";
import affirmationAbundance from "@/assets/affirmation-abundance.jpg";
import affirmationTrust from "@/assets/affirmation-trust.jpg";
import affirmationEnough from "@/assets/affirmation-enough.jpg";
import affirmationCalm from "@/assets/affirmation-calm.jpg";
import affirmationReceive from "@/assets/affirmation-receive.jpg";
import affirmationHonor from "@/assets/affirmation-honor.jpg";
import affirmationRelease from "@/assets/affirmation-release.jpg";
import affirmationNaturalJoy from "@/assets/affirmation-natural-joy.jpg";
import affirmationSafe from "@/assets/affirmation-safe.jpg";
import affirmationVoice from "@/assets/affirmation-voice.jpg";
import affirmationDreams from "@/assets/affirmation-dreams.jpg";
import affirmationPeace from "@/assets/affirmation-peace.jpg";
import affirmationProgress from "@/assets/affirmation-progress.jpg";
import affirmationIntuition from "@/assets/affirmation-intuition.jpg";
import affirmationMiracles from "@/assets/affirmation-miracles.jpg";
import affirmationFeel from "@/assets/affirmation-feel.jpg";
import affirmationCreating from "@/assets/affirmation-creating.jpg";
import affirmationPossibility from "@/assets/affirmation-possibility.jpg";
import affirmationChange from "@/assets/affirmation-change.jpg";
import affirmationProductiveRest from "@/assets/affirmation-productive-rest.jpg";
import affirmationAttract from "@/assets/affirmation-attract.jpg";
import affirmationDuality from "@/assets/affirmation-duality.jpg";

export interface Affirmation {
  id: string;
  title: string;
  category: "Self-Love" | "Abundance" | "Rest" | "Joy" | "Strength";
  description: string;
  price: number;
  formats: string[];
  image: string;
  featured?: boolean;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  socialProof?: string;
  certifications?: string[];
  originalPrice?: number;
  badge?: string;
  features?: string[];
  usageIdeas?: string[];
  productDetails?: {
    resolution?: string;
    fileFormats?: string;
    aspectRatios?: string;
    delivery?: string;
  };
}

export const affirmations: Affirmation[] = [
  // **PAGE 1: BEST PICKS** - Featured affirmations with premium positioning
  {
    id: "aff-001",
    title: "I am worthy of rest",
    category: "Self-Love",
    description: "A gentle reminder that rest is not earned—it is your birthright. In a world that glorifies productivity and hustle culture, this affirmation gives you permission to pause, breathe, and honor your need for restoration. Featuring soft earth tones with delicate script typography, this design brings calm to your daily rituals. Perfect for setting as your phone wallpaper or displaying in your sacred space, it serves as a compassionate nudge to prioritize self-care without guilt.",
    price: 11.99,
    originalPrice: 15.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationRest,
    featured: true,
    tags: ["rest", "self-care", "boundaries"],
    rating: 4.9,
    reviewCount: 2847,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "High Resolution", "Print Ready"],
    badge: "Best Seller",
    features: [
      "Premium minimal aesthetic design",
      "Works on all devices (phone, tablet, desktop)",
      "Multiple format options included",
      "Printable at professional quality (300 DPI)"
    ],
    usageIdeas: [
      "Set as your phone lock screen for daily reminders",
      "Use as desktop wallpaper during work hours",
      "Print and frame for your bedroom or meditation space",
      "Share with friends who need permission to rest"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-002",
    title: "I choose joy today",
    category: "Joy",
    description: "Every morning is an invitation to choose yourself. Joy is not something you wait for—it is a conscious decision you make again and again. This affirmation wallpaper celebrates the power of intention and reminds you that happiness begins with choice. Designed with warm, uplifting colors and modern typography, this piece transforms your phone screen or desktop into a daily source of inspiration. Whether you're navigating challenging seasons or simply want to anchor into gratitude, this affirmation helps you recenter on what matters most.",
    price: 14.49,
    originalPrice: 18.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationJoy,
    featured: true,
    tags: ["joy", "intention", "morning"],
    rating: 4.8,
    reviewCount: 2914,
    socialProof: "1.5K+ sold",
    certifications: ["Instant Download", "300 DPI", "Desktop Ready"],
    badge: "Staff Pick",
    features: [
      "Uplifting design with warm colors",
      "Perfect for morning mindfulness rituals",
      "Multiple print sizes available",
      "High-resolution files for crisp display"
    ],
    usageIdeas: [
      "Morning phone wallpaper to start your day with intention",
      "Desktop background for work motivation",
      "Print for bathroom mirror or bedroom wall",
      "Gift to friends who need encouragement"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-003",
    title: "Abundance flows to me",
    category: "Abundance",
    description: "Open your hands, open your heart—abundance is already yours. This manifestation wallpaper shifts your mindset from scarcity to possibility, reminding you that the universe is infinitely generous. Abundance isn't just about money; it's about love, opportunities, health, creativity, and joy flowing freely into your life. The elegant design features rich, luxurious tones that evoke feelings of prosperity and ease. Set this as your phone wallpaper or print it for your vision board to keep this powerful affirmation in constant view.",
    price: 17.99,
    originalPrice: 22.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationAbundance,
    featured: true,
    tags: ["abundance", "wealth", "receiving"],
    rating: 4.9,
    reviewCount: 2127,
    socialProof: "2K+ sold",
    certifications: ["Instant Download", "Premium Design", "High Resolution"],
    badge: "Most Popular",
    features: [
      "Luxurious design evoking prosperity",
      "Perfect for manifestation practices",
      "Ideal for vision boards and goal-setting",
      "Rich color palette for abundance mindset"
    ],
    usageIdeas: [
      "Daily phone wallpaper for manifestation practice",
      "Vision board centerpiece",
      "Print for your workspace or wealth corner",
      "Morning meditation visual anchor"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-004",
    title: "I trust my journey",
    category: "Strength",
    description: "Every step of your journey is sacred and exactly where you need to be. This affirmation wallpaper helps you release the need for control and embrace faith in the unfolding of your life. Trust doesn't mean knowing how things will turn out—it means believing you're equipped to handle whatever comes. With calming, grounded design elements and elegant typography, this piece brings peace to moments of uncertainty. Perfect for daily meditation, journaling rituals, or simply as a comforting reminder on your phone screen when life feels overwhelming.",
    price: 9.99,
    originalPrice: 14.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationTrust,
    tags: ["trust", "journey", "faith"],
    rating: 4.4,
    reviewCount: 1923,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "Minimal Design", "Phone Wallpaper"],
    features: [
      "Grounded, calming design",
      "Perfect for transitions and uncertainty",
      "Elegant typography",
      "Ideal for meditation spaces"
    ],
    usageIdeas: [
      "Phone wallpaper during life transitions",
      "Desktop background for daily reassurance",
      "Print for meditation or journaling space",
      "Comfort visual during challenging times"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-005",
    title: "I am enough, always",
    category: "Self-Love",
    description: "Not when you achieve more, not when you do more—right now, exactly as you are, you are enough. This self-love affirmation wallpaper challenges the lie that your worth is tied to productivity or achievement. You are inherently valuable simply because you exist. The design features soft, compassionate colors and timeless typography that feels like a warm embrace. Use this as your daily reminder to practice radical self-acceptance and release the pressure to constantly prove yourself. Perfect for perfectionists, recovering people-pleasers, and anyone learning to love themselves unconditionally.",
    price: 13.95,
    originalPrice: 17.95,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationEnough,
    featured: true,
    tags: ["self-love", "worthiness", "acceptance"],
    rating: 4.9,
    reviewCount: 2928,
    socialProof: "2.5K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "Print Ready"],
    badge: "Best Seller",
    features: [
      "Compassionate, warm design",
      "Perfect for perfectionists and people-pleasers",
      "Timeless typography",
      "Multiple format options for all uses"
    ],
    usageIdeas: [
      "Daily phone wallpaper for self-acceptance reminders",
      "Print for bathroom mirror affirmations",
      "Desktop background during work stress",
      "Gift for loved ones struggling with self-worth"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-006",
    title: "My calm is my power",
    category: "Strength",
    description: "In a chaotic world that demands constant reaction, your calm is your superpower. This strength affirmation wallpaper reminds you that peace is not passive—it's revolutionary. When you choose calm, you reclaim your power from external circumstances and anchor into your center. The design features serene, grounding colors with bold, confident typography that reflects inner strength. Perfect for high-stress careers, busy moms, anxious hearts, or anyone learning to regulate their nervous system. Your calm creates space for clarity, wisdom, and intentional action. This affirmation art helps you remember you can be steady, centered, and powerful.",
    price: 10.89,
    originalPrice: 14.89,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationCalm,
    featured: true,
    tags: ["calm", "power", "peace"],
    rating: 4.8,
    reviewCount: 2631,
    socialProof: "1.2K+ sold",
    certifications: ["Instant Download", "High Resolution", "Minimal Design"],
    badge: "Staff Pick",
    features: [
      "Serene, grounding design",
      "Perfect for stress management",
      "Bold yet peaceful typography",
      "Ideal for mindfulness practice"
    ],
    usageIdeas: [
      "Phone wallpaper for nervous system regulation",
      "Desktop background for high-stress work environments",
      "Print for meditation or yoga space",
      "Visual anchor during anxious moments"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  // **PAGE 2: Additional Popular Affirmations**
  {
    id: "aff-007",
    title: "I receive what I desire",
    category: "Abundance",
    description: "Your desires are not selfish—they are signposts to your purpose. This receiving affirmation wallpaper encourages you to stay open to blessings and opportunities flowing your way. When you release resistance and allow yourself to receive, you align with the natural abundance of the universe. Featuring empowering design elements and uplifting colors, this affirmation supports your manifestation journey. Perfect for anyone ready to step into receiving mode and attract what they truly desire. Use daily as a visual reminder that you deserve to have everything you dream of and more.",
    price: 16.49,
    originalPrice: 21.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationReceive,
    tags: ["receiving", "desire", "manifestation"],
    rating: 4.6,
    reviewCount: 1456,
    socialProof: "700+ sold",
    certifications: ["Instant Download", "Desktop Ready", "High Resolution"],
    features: [
      "Empowering manifestation design",
      "Perfect for receiving mode activation",
      "Large print format available"
    ],
    usageIdeas: [
      "Vision board centerpiece",
      "Phone wallpaper for manifestation rituals",
      "Print for workspace or bedroom"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-008",
    title: "Today, I honor myself",
    category: "Self-Love",
    description: "Small acts of self-honor create a life you do not need to escape from. This daily affirmation wallpaper reminds you that honoring yourself is not selfish—it's essential. When you make choices that respect your needs, values, and boundaries, you build a foundation of self-trust and inner peace. The gentle, compassionate design features soothing colors and mindful typography perfect for morning rituals. Use this affirmation to start each day with intention and kindness toward yourself. Whether you display it on your phone or print it for your bathroom mirror, let it guide you toward consistent self-care and authentic living.",
    price: 8.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationHonor,
    tags: ["honor", "self-care", "daily"],
    rating: 4.3,
    reviewCount: 982,
    socialProof: "500+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Wallpaper"],
    features: [
      "Daily self-honor reminder",
      "Gentle, compassionate design",
      "Perfect for morning rituals"
    ],
    usageIdeas: [
      "Morning phone wallpaper",
      "Bathroom mirror print",
      "Daily affirmation anchor"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-009",
    title: "I release what no longer serves",
    category: "Strength",
    description: "Letting go is not giving up—it is making room for what is meant for you. This transformational affirmation wallpaper supports your journey of releasing old patterns, beliefs, and relationships that no longer align with your highest good. The design captures the essence of freedom and renewal, reminding you that release creates space for growth. Perfect for life transitions, healing journeys, or anyone ready to shed what's holding them back. Use during meditation, journaling, or release rituals to reinforce your commitment to moving forward. When you let go of what no longer serves, you open your hands to receive what does.",
    price: 11.49,
    originalPrice: 15.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationRelease,
    tags: ["release", "letting-go", "growth"],
    rating: 4.7,
    reviewCount: 2145,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "Print Ready", "High Resolution"],
    features: [
      "Transformational letting-go design",
      "Perfect for life transitions",
      "Multiple print formats available"
    ],
    usageIdeas: [
      "Phone wallpaper during major life changes",
      "Print for meditation space",
      "Visual reminder for release rituals"
    ],
    productDetails: {
      resolution: "300 DPI (print quality)",
      fileFormats: "JPG and PNG included",
      aspectRatios: "9:16 (phone), 16:9 (desktop), multiple print sizes",
      delivery: "Instant digital download after purchase"
    }
  },
  {
    id: "aff-010",
    title: "Joy is my natural state",
    category: "Joy",
    description: "You do not have to earn joy—it is already yours. This joyful affirmation wallpaper reminds you that happiness is not a destination to reach but your birthright to claim. When you recognize that joy is your natural state, you stop chasing it and start embodying it. The uplifting design features vibrant, warm colors and optimistic typography that brings lightness to your day. Perfect for anyone recovering from burnout, depression, or simply seeking more lightness in daily life. Use this affirmation to reconnect with the joy that lives within you, waiting to be remembered. Let this wallpaper be your daily invitation back to yourself.",
    price: 13.49,
    originalPrice: 17.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationNaturalJoy,
    tags: ["joy", "natural", "happiness"],
    rating: 4.5,
    reviewCount: 1672,
    socialProof: "800+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Ready"],
  },
  {
    id: "aff-011",
    title: "I am safe in my body",
    category: "Self-Love",
    description: "Your body is not your enemy—it is your home. This grounding affirmation wallpaper offers comfort and safety for anyone struggling with body image, trauma, or disconnection from their physical self. The soothing design features gentle colors and reassuring typography that communicates safety and belonging. When you affirm that you are safe in your body, you begin to heal the relationship between mind and body. Perfect for those on a body acceptance journey, healing from trauma, or simply seeking more embodiment and presence. Use this wallpaper as a daily reminder that your body is a sacred space deserving of love, care, and respect.",
    price: 9.49,
    originalPrice: 13.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationSafe,
    tags: ["body", "safety", "acceptance"],
    rating: 4.8,
    reviewCount: 1834,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "High Resolution", "Minimal Design"],
  },
  {
    id: "aff-012",
    title: "My voice matters",
    category: "Strength",
    description: "Speak your truth, even when your voice shakes. This empowering affirmation wallpaper is for anyone learning to use their voice, share their story, or stand up for what they believe. Your voice carries power, and the world needs to hear what you have to say. The bold design features confident typography and strong visual elements that reflect the courage it takes to speak up. Perfect for writers, speakers, activists, or anyone finding their voice after years of silence. Use this affirmation to remind yourself that your thoughts, feelings, and perspectives are valid and valuable. You have something important to share—let this wallpaper embolden you to say it.",
    price: 7.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationVoice,
    tags: ["voice", "truth", "courage"],
    rating: 4.2,
    reviewCount: 1245,
    socialProof: "600+ sold",
    certifications: ["Instant Download", "Print Ready", "Desktop Ready"],
  },
  // **PAGE 3: More Popular Affirmations**
  {
    id: "aff-013",
    title: "I am worthy of my dreams",
    category: "Abundance",
    description: "Your dreams chose you for a reason—honor them. This powerful affirmation wallpaper is for dreamers, visionaries, and anyone who's been told their goals are too big. You are worthy of everything you desire, not because of what you do but because of who you are. The inspiring design features motivational elements and aspirational colors that ignite ambition and belief. Perfect for goal-setters, entrepreneurs, creatives, or anyone manifesting their dream life. Use this affirmation to silence the voice of self-doubt and step boldly toward your vision. When you honor your dreams, you honor yourself. Let this wallpaper be your daily permission slip to dream big and believe you deserve it all.",
    price: 18.99,
    originalPrice: 24.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationDreams,
    tags: ["dreams", "worthiness", "purpose"],
    rating: 4.7,
    reviewCount: 2387,
    socialProof: "1.1K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "High Resolution"],
  },
  {
    id: "aff-014",
    title: "I choose peace over perfection",
    category: "Rest",
    description: "Perfection is exhausting—peace is possible. This liberating affirmation wallpaper is for perfectionists, overachievers, and anyone tired of the endless pursuit of flawlessness. When you choose peace over perfection, you give yourself permission to be human, to make mistakes, and to rest. The calming design features soothing colors and gentle typography that whisper permission to let go of impossible standards. Perfect for type-A personalities, recovering perfectionists, or anyone seeking more ease in life. Use this affirmation to break free from the tyranny of perfection and embrace the beauty of imperfection. Peace is not found in flawlessness—it's found in acceptance.",
    price: 10.49,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationPeace,
    tags: ["peace", "perfection", "rest"],
    rating: 4.6,
    reviewCount: 1563,
    socialProof: "750+ sold",
    certifications: ["Instant Download", "Minimal Design", "Phone Wallpaper"],
  },
  {
    id: "aff-015",
    title: "I celebrate my progress",
    category: "Joy",
    description: "Every step forward deserves recognition, no matter how small. This celebratory affirmation wallpaper reminds you to honor your journey and acknowledge how far you've come. In a culture obsessed with the destination, this design invites you to celebrate the path itself. The joyful colors and uplifting typography create a feeling of accomplishment and gratitude for your growth. Perfect for anyone in a season of transformation, recovery, or personal development. Use this affirmation to cultivate self-compassion and appreciation for your efforts. Progress is not linear, and every tiny step matters. Let this wallpaper remind you to pause, reflect, and celebrate yourself—you're doing better than you think.",
    price: 8.49,
    originalPrice: 11.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationProgress,
    tags: ["progress", "celebration", "growth"],
    rating: 4.1,
    reviewCount: 1124,
    socialProof: "550+ sold",
    certifications: ["Instant Download", "Premium Design", "Print Ready"],
  },
  {
    id: "aff-016",
    title: "My intuition guides me",
    category: "Strength",
    description: "That whisper inside? It knows the way. This intuitive affirmation wallpaper is for anyone learning to trust their inner voice and follow their gut. Your intuition is not random—it's your soul's GPS, guiding you toward alignment and away from what doesn't serve you. The mystical design features flowing elements and ethereal colors that evoke inner knowing and spiritual connection. Perfect for empaths, HSPs (highly sensitive persons), or anyone developing their intuitive gifts. Use this affirmation to strengthen your relationship with your inner wisdom. When you trust your intuition, you trust yourself. Let this wallpaper be your daily reminder to listen to the quiet voice within—it's never led you astray.",
    price: 14.95,
    originalPrice: 19.95,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationIntuition,
    tags: ["intuition", "guidance", "inner-wisdom"],
    rating: 4.7,
    reviewCount: 1987,
    socialProof: "950+ sold",
    certifications: ["Instant Download", "High Resolution", "Desktop Ready"],
  },
  {
    id: "aff-017",
    title: "I am open to miracles",
    category: "Abundance",
    description: "Magic happens when you believe it can. This miracle-welcoming affirmation wallpaper invites you to release cynicism and open your heart to unexpected blessings. Miracles are not reserved for the lucky—they're available to anyone who stays open to possibility. The enchanting design features whimsical elements and hopeful colors that inspire wonder and faith. Perfect for anyone seeking to restore hope, manifest dreams, or simply believe in magic again. Use this affirmation to shift from skepticism to openness. When you expect miracles, you start to see them everywhere. Let this wallpaper be your daily invitation to believe in the impossible and watch it become possible.",
    price: 15.99,
    originalPrice: 20.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationMiracles,
    tags: ["miracles", "magic", "possibility"],
    rating: 4.5,
    reviewCount: 1698,
    socialProof: "820+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "Print Ready"],
  },
  {
    id: "aff-018",
    title: "I give myself permission to feel",
    category: "Self-Love",
    description: "All feelings are welcome here. You do not have to be strong all the time. This compassionate affirmation wallpaper is for anyone who's been told to suppress their emotions, stay positive, or toughen up. Your feelings are not weaknesses—they are wisdom. They tell you what you need, what matters, and what's working or not working in your life. The tender design features soft colors and gentle typography that create a safe space for emotional expression. Perfect for highly sensitive souls, emotion-phobic individuals, or anyone healing from toxic positivity. Use this affirmation to reclaim your right to feel fully and deeply. Emotional authenticity is not a flaw—it's a strength.",
    price: 11.79,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationFeel,
    tags: ["feelings", "permission", "vulnerability"],
    rating: 4.8,
    reviewCount: 2214,
    socialProof: "1K+ sold",
    certifications: ["Instant Download", "Minimal Design", "High Resolution"],
  },
  // **PAGE 4: Final Collection**
  {
    id: "aff-019",
    title: "I am creating the life I desire",
    category: "Strength",
    description: "Every choice is a brushstroke. You are the artist. This empowering affirmation wallpaper reminds you that you are not a passive recipient of life—you are an active creator. Each decision, action, and thought shapes your reality. The creative design features artistic elements and bold colors that inspire agency and intentionality. Perfect for anyone taking ownership of their life, breaking old patterns, or stepping into their power. Use this affirmation to shift from victim mentality to creator consciousness. You are not stuck with the life you have—you have the power to create the life you desire. Let this wallpaper be your daily reminder that you hold the paintbrush.",
    price: 9.89,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationCreating,
    tags: ["creation", "life", "intention"],
    rating: 4.4,
    reviewCount: 1445,
    socialProof: "700+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Ready"],
  },
  {
    id: "aff-020",
    title: "Today is full of possibility",
    category: "Joy",
    description: "Each sunrise brings infinite potential. What will you choose? This optimistic affirmation wallpaper is for anyone seeking to greet each day with hope and openness. Today is a blank canvas, full of opportunities you haven't yet imagined. The bright design features dawn-inspired colors and hopeful typography that evoke new beginnings. Perfect for morning people, optimists, or anyone needing encouragement to start fresh. Use this affirmation to release yesterday's disappointments and step into today's potential. Every day is a gift of possibility—unwrap it with curiosity and excitement. Let this wallpaper be your daily reminder that today holds more magic than you know.",
    price: 10.99,
    originalPrice: 14.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationPossibility,
    tags: ["possibility", "potential", "today"],
    rating: 3.9,
    reviewCount: 1089,
    socialProof: "530+ sold",
    certifications: ["Instant Download", "Desktop Ready", "Print Ready"],
  },
  {
    id: "aff-021",
    title: "I am allowed to change my mind",
    category: "Self-Love",
    description: "Growth means evolution. You are not stuck with old decisions. This liberating affirmation wallpaper is for anyone who feels trapped by past commitments, beliefs, or identities. Changing your mind is not failure—it's wisdom. It means you're learning, growing, and honoring who you're becoming. The fluid design features flowing elements and transitional colors that reflect transformation. Perfect for people-pleasers, over-committers, or anyone afraid to pivot. Use this affirmation to give yourself permission to evolve. You don't owe anyone consistency at the cost of your authenticity. Let this wallpaper be your daily reminder that you're allowed to grow, change, and become someone new.",
    price: 13.29,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationChange,
    tags: ["change", "growth", "permission"],
    rating: 4.6,
    reviewCount: 1523,
    socialProof: "730+ sold",
    certifications: ["Instant Download", "High Resolution", "Minimal Design"],
  },
  {
    id: "aff-022",
    title: "My rest is productive",
    category: "Rest",
    description: "Rest is not laziness—it is how you recharge your magic. This revolutionary affirmation wallpaper challenges the toxic productivity culture that equates rest with wasted time. Rest is not the absence of productivity; it is the foundation of sustainable productivity. The restorative design features calming colors and peaceful typography that invite you to slow down without guilt. Perfect for workaholics, burnout survivors, or anyone learning to value rest. Use this affirmation to reframe rest as essential rather than optional. Your body and mind need downtime to create, heal, and thrive. Let this wallpaper be your daily permission slip to rest proudly and productively.",
    price: 9.79,
    originalPrice: 13.79,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationProductiveRest,
    tags: ["rest", "productivity", "recharge"],
    rating: 4.7,
    reviewCount: 1876,
    socialProof: "900+ sold",
    certifications: ["Instant Download", "Premium Design", "Phone Wallpaper"],
  },
  {
    id: "aff-023",
    title: "I attract what I embody",
    category: "Abundance",
    description: "Become the energy you wish to attract. This transformational affirmation wallpaper teaches the law of attraction at its deepest level. You don't attract what you want—you attract who you are. When you embody the qualities you desire, you magnetize them into your life. The radiant design features energy-inspired elements and magnetic colors that reflect this powerful truth. Perfect for manifesters, spiritual seekers, or anyone ready to do the inner work. Use this affirmation to shift from chasing to embodying. When you become the energy of love, abundance, and joy, you naturally attract more of it. Let this wallpaper be your daily call to embody your desires.",
    price: 16.99,
    originalPrice: 21.99,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationAttract,
    tags: ["attraction", "embodiment", "energy"],
    rating: 4.8,
    reviewCount: 2456,
    socialProof: "1.2K+ sold",
    certifications: ["Instant Download", "Premium Aesthetic", "High Resolution"],
  },
  {
    id: "aff-024",
    title: "I am both the storm and the calm",
    category: "Strength",
    description: "You contain multitudes. All of you is welcome. This profound affirmation wallpaper is for anyone tired of splitting themselves into acceptable and unacceptable parts. You are not one-dimensional—you are complex, contradictory, and complete. You can be strong and soft, fierce and gentle, the storm and the calm. The dynamic design features contrasting elements and balanced colors that honor your wholeness. Perfect for anyone healing from shame, perfectionism, or self-rejection. Use this affirmation to embrace all aspects of yourself without apology. You don't have to choose one version of yourself—you get to be everything. Let this wallpaper be your daily celebration of your beautiful complexity.",
    price: 11.29,
    formats: ["Phone Wallpaper", "Desktop Wallpaper", "Print 5x7", "Print 8x10", "Print 11x14", "Print 16x20", "Print 18x24", "Print 24x36"],
    image: affirmationDuality,
    tags: ["duality", "wholeness", "acceptance"],
    rating: 4.5,
    reviewCount: 1334,
    socialProof: "650+ sold",
    certifications: ["Instant Download", "Print Ready", "Desktop Ready"],
  },
];
