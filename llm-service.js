// LLM Service for Zazim SkillQuest - Simulated AI Question & Explanation Generator
// No API keys required - All local processing

class LLMService {
    constructor() {
        // Industry-specific question banks (20 questions each category)
        this.questionBanks = {
            'fire-safety': this.getFireSafetyQuestions(),
            'gdpr': this.getGDPRQuestions(),
            'health-safety': this.getHealthSafetyQuestions(),
            'manual-handling': this.getManualHandlingQuestions(),
            'cybersecurity': this.getCybersecurityQuestions(),
            'safeguarding': this.getSafeguardingQuestions(),
            'food-safety': this.getFoodSafetyQuestions(),
            'electrical-safety': this.getElectricalSafetyQuestions(),
            'first-aid': this.getFirstAidQuestions(),
            'environmental': this.getEnvironmentalQuestions()
        };
        
        // AI Response Styles
        this.responseStyles = [
            "Engaging and conversational",
            "Technical and detailed",
            "Story-based with real-world examples",
            "Simple and easy to understand",
            "Humorous and light-hearted",
            "Serious and professional",
            "Motivational and encouraging"
        ];
        
        // AI Personalities for explanations
        this.aiPersonalities = [
            { name: "Alex", trait: "Friendly Safety Expert", emoji: "👨‍🚒" },
            { name: "Dr. Data", trait: "GDPR Compliance Guru", emoji: "👨‍💼" },
            { name: "Safety Sam", trait: "Health & Safety Veteran", emoji: "👷‍♂️" },
            { name: "Professor Protocol", trait: "Regulations Specialist", emoji: "👨‍🏫" },
            { name: "AI-Assistant", trait: "Training Companion", emoji: "🤖" }
        ];
    }
    
    // Generate questions for a specific module
    generateQuestions(moduleId, count = 10) {
        const bank = this.questionBanks[moduleId];
        if (!bank) {
            console.error(`No question bank found for module: ${moduleId}`);
            return this.getDefaultQuestions();
        }
        
        // Shuffle and select random questions
        const shuffled = [...bank].sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffled.slice(0, Math.min(count, shuffled.length));
        
        // Add AI-generated metadata
        return selectedQuestions.map((q, index) => ({
            ...q,
            id: `${moduleId}-q${index + 1}`,
            aiGenerated: true,
            difficulty: this.calculateDifficulty(q),
            estimatedTime: Math.floor(Math.random() * 3) + 1, // 1-3 minutes
            personality: this.getRandomPersonality()
        }));
    }
    
    // Generate engaging explanation for a question
    generateExplanation(question, userAnswer, isCorrect) {
        const personality = question.personality || this.getRandomPersonality();
        const style = this.responseStyles[Math.floor(Math.random() * this.responseStyles.length)];
        
        let explanation = {
            text: '',
            icon: isCorrect ? '🎯' : '💡',
            personality: personality,
            style: style,
            tips: [],
            funFact: this.getFunFact(question.category)
        };
        
        if (isCorrect) {
            explanation.text = this.generateCorrectExplanation(question, personality);
        } else {
            explanation.text = this.generateIncorrectExplanation(question, userAnswer, personality);
        }
        
        // Add learning tips
        explanation.tips = this.generateLearningTips(question);
        
        // Add gamification elements
        explanation.gamification = {
            points: isCorrect ? 10 : 5,
            streakBonus: isCorrect ? 2 : 0,
            badgeEligibility: this.checkBadgeEligibility(question)
        };
        
        return explanation;
    }
    
    // Generate adaptive follow-up question
    generateFollowUpQuestion(previousQuestion, userWasCorrect) {
        const moduleId = previousQuestion.category || 'general';
        const difficulty = userWasCorrect ? 'harder' : 'easier';
        
        return {
            question: `Based on your ${userWasCorrect ? 'excellent' : 'previous'} answer, here's a ${difficulty} question:`,
            options: this.generateOptionsForFollowUp(previousQuestion, difficulty),
            correctAnswer: 0, // Always first option for simulation
            category: moduleId,
            adaptive: true,
            context: `Follow-up to "${previousQuestion.question.substring(0, 50)}..."`
        };
    }
    
    // Get progress insights (simulated AI analysis)
    getProgressInsights(completedQuestions, score, timeSpent) {
        const accuracy = (score / completedQuestions.length) * 100;
        const averageTime = timeSpent / completedQuestions.length;
        
        return {
            summary: this.generatePerformanceSummary(accuracy, averageTime),
            strengths: this.identifyStrengths(completedQuestions),
            areasForImprovement: this.identifyImprovementAreas(completedQuestions),
            recommendations: this.generateRecommendations(accuracy, averageTime),
            motivationalMessage: this.getMotivationalMessage(accuracy)
        };
    }
    
    // Generate certificate text (simulated AI)
    generateCertificateText(userName, moduleName, score, completionDate) {
        const templates = [
            `This certifies that ${userName} has successfully completed ${moduleName} training with ${score}% accuracy, demonstrating exceptional understanding and commitment to workplace safety.`,
            `Congratulations to ${userName} for mastering ${moduleName}! Your ${score}% score reflects deep comprehension and practical knowledge application.`,
            `${userName} has excelled in ${moduleName}, achieving ${score}% proficiency. This achievement signifies dedication to professional development and safety excellence.`
        ];
        
        return templates[Math.floor(Math.random() * templates.length)];
    }
    
    // =============================================
    // QUESTION BANKS (30 questions each category)
    // =============================================

    getFireSafetyQuestions() {
        return [
            {
                question: "What is the primary purpose of a fire risk assessment?",
                options: [
                    "To identify potential fire hazards and people at risk",
                    "To calculate insurance costs",
                    "To plan office layouts",
                    "To schedule fire drills"
                ],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "Fire risk assessments systematically identify fire hazards, evaluate risks, and implement control measures to protect people and property. It's a legal requirement under the Regulatory Reform (Fire Safety) Order 2005."
            },
            {
                question: "Which class of fire involves flammable liquids like petrol?",
                options: ["Class A", "Class B", "Class C", "Class D"],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Class B fires involve flammable liquids. Water extinguishers should NOT be used as they can spread the fire. Use foam, powder, or CO2 extinguishers instead."
            },
            {
                question: "What does RACE stand for in fire emergency procedures?",
                options: [
                    "Rescue, Alert, Contain, Evacuate",
                    "Remove, Alarm, Confine, Exit",
                    "Respond, Announce, Control, Escape",
                    "Recognise, Activate, Call, Evacuate"
                ],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "RACE: Rescue anyone in danger, Alert by activating alarm, Contain fire by closing doors, Evacuate safely. This protocol is taught in all UK fire safety training."
            },
            {
                question: "How often should fire extinguishers be professionally inspected?",
                options: ["Monthly", "Every 6 months", "Annually", "Every 2 years"],
                correctAnswer: 2,
                category: "fire-safety",
                explanation: "UK regulations require annual professional inspection by a competent person, with monthly visual checks by staff. BS 5306-3:2017 provides detailed guidance."
            },
            {
                question: "What is the minimum width for fire escape routes in offices?",
                options: ["750mm", "1000mm", "1200mm", "1500mm"],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Fire escape routes must be at least 1000mm wide to allow safe evacuation of wheelchair users and people with mobility aids, following Approved Document B."
            },
            {
                question: "Which fire extinguisher is suitable for electrical fires?",
                options: ["Water", "Foam", "CO2", "Wet chemical"],
                correctAnswer: 2,
                category: "fire-safety",
                explanation: "CO2 extinguishers are safe for electrical fires as they don't conduct electricity and leave no residue. Never use water on electrical fires!"
            },
            {
                question: "What is the 'two out, all out' rule in fire evacuation?",
                options: [
                    "Two alarms mean everyone must evacuate",
                    "Two people must check the fire before evacuation",
                    "Two exits must be used for evacuation",
                    "Two minutes is the maximum evacuation time"
                ],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "The 'two out, all out' rule means if two fire alarms sound, everyone must evacuate immediately regardless of location or floor."
            },
            {
                question: "What does ALARP stand for in fire safety management?",
                options: [
                    "As Low As Reasonably Practicable",
                    "All Leave Area Rapidly Procedure",
                    "Alert Level Assessment and Response Protocol",
                    "Automatic Lockdown and Rescue Process"
                ],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "ALARP (As Low As Reasonably Practicable) is a key principle in UK health and safety law, requiring risks to be reduced to the lowest level reasonably achievable."
            },
            {
                question: "How many fire drills should be conducted annually in a workplace?",
                options: ["At least 1", "At least 2", "At least 4", "At least 6"],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "The Regulatory Reform (Fire Safety) Order 2005 recommends at least one drill annually, but high-risk workplaces should conduct more frequent drills."
            },
            {
                question: "What is the maximum distance to a fire extinguisher in most workplaces?",
                options: ["15 meters", "25 meters", "30 meters", "45 meters"],
                correctAnswer: 2,
                category: "fire-safety",
                explanation: "BS 5306 recommends fire extinguishers should be no more than 30 meters from any point in low-risk areas. High-risk areas require closer spacing."
            },
            {
                question: "Which of these is NOT a common cause of workplace fires?",
                options: ["Faulty electrical equipment", "Poor housekeeping", "Natural sunlight", "Hot work activities"],
                correctAnswer: 2,
                category: "fire-safety",
                explanation: "While sunlight through glass can start fires (magnifying effect), it's not among the top causes which are electrical faults, arson, and cooking equipment."
            },
            {
                question: "What does PASS stand for when using a fire extinguisher?",
                options: [
                    "Pull, Aim, Squeeze, Sweep",
                    "Point, Activate, Spray, Stop",
                    "Press, Align, Shoot, Swing",
                    "Prepare, Assess, Shoot, Secure"
                ],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "PASS: Pull the pin, Aim at base of fire, Squeeze handle, Sweep side to side. This technique is taught in all basic fire safety training."
            },
            {
                question: "How long should fire doors resist fire (FD30 rating)?",
                options: ["15 minutes", "30 minutes", "60 minutes", "90 minutes"],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Most fire doors are rated for 30 minutes (FD30). Critical areas may require 60 (FD60) or 90-minute (FD90) doors as specified in BS 476-22."
            },
            {
                question: "What percentage of workplace fires are caused by electrical faults?",
                options: ["15%", "25%", "35%", "45%"],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Electrical faults cause approximately 25% of workplace fires, making regular PAT testing and electrical safety checks essential for compliance."
            },
            {
                question: "Which material is most fire-resistant?",
                options: ["Plywood", "Gypsum board", "MDF", "Particle board"],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Gypsum board (drywall) contains water in its crystal structure which evaporates under heat, slowing fire spread and providing up to 2 hours fire resistance."
            },
            {
                question: "What is flashover?",
                options: [
                    "When all combustible materials simultaneously ignite",
                    "When a fire jumps between buildings",
                    "When extinguishers flash during use",
                    "When smoke changes colour rapidly"
                ],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "Flashover occurs when radiant heat causes all combustible materials in a room to ignite simultaneously - extremely dangerous for firefighters."
            },
            {
                question: "Which fire safety sign indicates a fire assembly point?",
                options: ["Blue circle", "Green rectangle", "Red square", "Yellow triangle"],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Green rectangular signs with white pictograms indicate safe condition information like assembly points, following BS 5499 standards."
            },
            {
                question: "What is the recommended maximum occupancy for a room with one exit?",
                options: ["25 people", "50 people", "60 people", "75 people"],
                correctAnswer: 2,
                category: "fire-safety",
                explanation: "Building regulations typically limit single-exit rooms to 60 people to ensure safe evacuation times of less than 2.5 minutes."
            },
            {
                question: "Which gas is most commonly used in fire suppression systems for server rooms?",
                options: ["Carbon dioxide", "Nitrogen", "Inergen", "FM-200"],
                correctAnswer: 3,
                category: "fire-safety",
                explanation: "FM-200 (heptafluoropropane) is clean, leaves no residue, and is safe for occupied spaces with electronic equipment, with zero ozone depletion potential."
            },
            {
                question: "How often should emergency lighting be tested?",
                options: ["Monthly", "Quarterly", "Annually", "Every 3 years"],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "BS 5266 requires monthly functional tests (30 seconds) and annual duration tests (3 hours) of emergency lighting systems."
            },
            {
                question: "What is the typical activation temperature of a standard sprinkler head?",
                options: ["57°C", "68°C", "79°C", "93°C"],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Most sprinklers activate at 68°C. Different colour bulbs indicate different temperature ratings: orange (57°C), red (68°C), yellow (79°C), green (93°C)."
            },
            {
                question: "What does the term 'means of escape' refer to in fire safety?",
                options: [
                    "All possible exits from a building",
                    "Structural protection provided by fire doors",
                    "Safe route from any point to a place of safety",
                    "Emergency communication systems"
                ],
                correctAnswer: 2,
                category: "fire-safety",
                explanation: "'Means of escape' refers to the safe route from any point in a building to a place of safety, considering travel distance, exit widths, and fire protection."
            },
            {
                question: "What is the maximum travel distance to a fire exit in an office building?",
                options: ["18 meters", "25 meters", "45 meters", "60 meters"],
                correctAnswer: 2,
                category: "fire-safety",
                explanation: "For single direction escape routes in offices, maximum travel distance is 18m in high risk, 25m in normal risk, and 45m in low risk areas."
            },
            {
                question: "Which regulation requires employers to appoint a 'responsible person' for fire safety?",
                options: [
                    "Health and Safety at Work Act 1974",
                    "Regulatory Reform (Fire Safety) Order 2005",
                    "Building Regulations 2010",
                    "Management of Health and Safety at Work Regulations 1999"
                ],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "The Regulatory Reform (Fire Safety) Order 2005 requires employers to appoint a 'responsible person' to ensure fire safety compliance."
            },
            {
                question: "What is the purpose of a fire damper in HVAC systems?",
                options: [
                    "To control temperature during fires",
                    "To prevent smoke spread through ductwork",
                    "To increase ventilation during evacuation",
                    "To detect fire in air handling units"
                ],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Fire dampers automatically close to prevent smoke and fire spread through HVAC ductwork, typically activated by fusible links at 72°C."
            },
            {
                question: "What does 'compartmentation' achieve in building fire safety?",
                options: [
                    "Divides building into fire-resistant compartments",
                    "Groups fire safety equipment together",
                    "Separates fire wardens by floor",
                    "Organizes evacuation procedures"
                ],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "Compartmentation divides buildings into fire-resistant compartments using fire-rated walls, floors, and doors to contain fire spread for specified periods."
            },
            {
                question: "How often should fire alarm systems be tested?",
                options: ["Weekly", "Monthly", "Quarterly", "Annually"],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "BS 5839 requires fire alarm systems to be tested weekly with different call points each week, and maintained by a competent person every 6 months."
            },
            {
                question: "What is the purpose of intumescent strips on fire doors?",
                options: [
                    "To provide sound insulation",
                    "To expand and seal gaps when heated",
                    "To indicate door temperature",
                    "To make doors easier to open"
                ],
                correctAnswer: 1,
                category: "fire-safety",
                explanation: "Intumescent strips expand up to 50 times their volume when heated to 120-200°C, sealing gaps around fire doors to prevent smoke spread."
            },
            {
                question: "What does 'stay put' policy mean in high-rise buildings?",
                options: [
                    "Stay in your flat unless directly affected by fire",
                    "Stay put until firefighters arrive",
                    "Stay where you are during alarm testing",
                    "Stay put during initial fire development"
                ],
                correctAnswer: 0,
                category: "fire-safety",
                explanation: "'Stay put' policy: residents stay in their flats unless directly affected by fire, relying on compartmentation. This is under review post-Grenfell."
            },
            {
                question: "What is the minimum fire resistance for structural steel in commercial buildings?",
                options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes"],
                correctAnswer: 2,
                category: "fire-safety",
                explanation: "Structural steel in commercial buildings typically requires 90 minutes fire resistance, achieved through intumescent coatings, concrete encasement, or boarding systems."
            }
        ];
    }

    getGDPRQuestions() {
        return [
            {
                question: "What does GDPR stand for?",
                options: [
                    "General Data Protection Regulation",
                    "Global Data Privacy Rules",
                    "Government Data Protection Requirements",
                    "General Digital Privacy Rights"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "GDPR stands for General Data Protection Regulation (Regulation (EU) 2016/679), the EU's comprehensive data protection law effective from May 2018."
            },
            {
                question: "What is the maximum fine for GDPR violations?",
                options: ["€10 million", "€20 million", "€30 million", "€40 million"],
                correctAnswer: 1,
                category: "gdpr",
                explanation: "Maximum fines are the higher of €20 million or 4% of global annual turnover for serious violations, and €10 million or 2% for other infringements."
            },
            {
                question: "How long do organisations have to report a data breach to the ICO?",
                options: ["24 hours", "72 hours", "7 days", "30 days"],
                correctAnswer: 1,
                category: "gdpr",
                explanation: "Organisations must report data breaches to the Information Commissioner's Office (ICO) within 72 hours of becoming aware, unless the breach is unlikely to result in risk."
            },
            {
                question: "What is the lawful basis for processing personal data under GDPR?",
                options: [
                    "Consent, contract, legal obligation, vital interests, public task, legitimate interests",
                    "Business need, customer preference, industry standard, company policy",
                    "Profitability, market research, advertising, sales requirements",
                    "Technical capability, storage availability, data quantity, processing speed"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "The six lawful bases under Article 6 are: consent, contract, legal obligation, vital interests, public task, and legitimate interests. At least one must apply."
            },
            {
                question: "What is the right to data portability?",
                options: [
                    "Right to receive personal data in a structured, commonly used format",
                    "Right to transfer data between cloud services",
                    "Right to access data on portable devices",
                    "Right to physically move data storage locations"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "The right to data portability allows individuals to obtain and reuse their personal data across different services in a structured, commonly used, machine-readable format."
            },
            {
                question: "What must be included in a Privacy Notice under GDPR?",
                options: [
                    "Identity of data controller, purposes of processing, data retention periods, rights of individuals",
                    "Company history, employee details, financial information, marketing plans",
                    "Technical specifications, software versions, server locations, backup schedules",
                    "Product prices, service offerings, customer testimonials, contact information"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Privacy Notices must include controller identity, DPO contact details, processing purposes, legal basis, data retention periods, and individual rights information."
            },
            {
                question: "What is the role of a Data Protection Officer (DPO)?",
                options: [
                    "Monitor compliance, provide advice, act as contact point for data subjects and authorities",
                    "Manage IT security, handle data backups, maintain server infrastructure",
                    "Oversee marketing campaigns, manage customer databases, analyze sales data",
                    "Develop software applications, test security protocols, implement encryption"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "The DPO monitors GDPR compliance, advises on data protection impact assessments, acts as contact point for data subjects and supervisory authorities."
            },
            {
                question: "What is a Data Protection Impact Assessment (DPIA)?",
                options: [
                    "Assessment of data protection risks before processing activities",
                    "Annual review of security incidents",
                    "Audit of data storage facilities",
                    "Evaluation of employee data handling training"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "A DPIA is required for high-risk processing activities to assess and mitigate risks to individuals' rights and freedoms before processing begins."
            },
            {
                question: "How long should personal data be retained?",
                options: [
                    "No longer than necessary for the purposes collected",
                    "Indefinitely for business continuity",
                    "Until the individual requests deletion",
                    "For the lifetime of the business"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Data should not be kept longer than necessary for the purposes it was collected. Retention periods must be defined and justified."
            },
            {
                question: "What is the 'right to be forgotten'?",
                options: [
                    "Right to have personal data erased in certain circumstances",
                    "Right to delete social media accounts",
                    "Right to remove information from search engines",
                    "Right to destroy physical records"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "The right to erasure (right to be forgotten) allows individuals to request deletion of their personal data in specific circumstances under Article 17."
            },
            {
                question: "What is 'pseudonymisation' under GDPR?",
                options: [
                    "Processing data so it can't be attributed to a specific individual without additional information",
                    "Replacing names with codes",
                    "Encrypting all personal data",
                    "Removing all identifying information"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Pseudonymisation processes data so it cannot be attributed to a specific data subject without additional information kept separately and secured."
            },
            {
                question: "When must organisations appoint a Data Protection Officer?",
                options: [
                    "When processing is carried out by a public authority, or core activities involve regular monitoring of data subjects on a large scale",
                    "When company has more than 50 employees",
                    "When processing customer data for marketing",
                    "When using cloud storage services"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "DPO appointment is mandatory for public authorities and organisations whose core activities involve regular, systematic monitoring of data subjects on a large scale."
            },
            {
                question: "What is the 'one-stop shop' mechanism?",
                options: [
                    "Organisations dealing with cross-border processing deal mainly with lead supervisory authority",
                    "Single contact point for all data protection queries",
                    "Centralized database for all personal data",
                    "Unified GDPR compliance software"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "The one-stop shop mechanism allows organisations operating in multiple EU countries to deal mainly with the supervisory authority in their main establishment country."
            },
            {
                question: "What is the age of consent for children's data processing?",
                options: ["13", "16", "18", "21"],
                correctAnswer: 1,
                category: "gdpr",
                explanation: "The age of consent is 16, though member states can lower it to no less than 13. In the UK, it's 13, requiring parental consent for children under 13."
            },
            {
                question: "What is the difference between a data controller and a data processor?",
                options: [
                    "Controller determines purposes and means of processing, processor processes on controller's behalf",
                    "Controller stores data, processor analyzes data",
                    "Controller collects data, processor deletes data",
                    "Controller is the individual, processor is the organisation"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Controllers determine why and how personal data is processed. Processors act on the controller's instructions. Both have specific GDPR obligations."
            },
            {
                question: "What must be included in a Data Processing Agreement?",
                options: [
                    "Subject matter, duration, nature and purpose of processing, type of personal data, obligations of parties",
                    "Financial terms, service levels, termination clauses, payment schedules",
                    "Technical specifications, software requirements, hardware details, network configurations",
                    "Marketing strategies, customer acquisition targets, sales projections, growth plans"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Article 28 requires written contracts specifying subject matter, duration, nature and purpose of processing, data types, obligations, and security measures."
            },
            {
                question: "What are the principles of data protection by design and by default?",
                options: [
                    "Integrate data protection into processing activities and default settings from the outset",
                    "Design systems after data collection, apply defaults as needed",
                    "Protect data during design phase, default to minimum security",
                    "Design for compliance, default to opt-out models"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Data protection by design integrates data protection into processing activities from design stage. By default ensures only necessary data is processed by default."
            },
            {
                question: "What is the right to restriction of processing?",
                options: [
                    "Right to limit processing of personal data in certain circumstances",
                    "Right to slow down data processing speed",
                    "Right to restrict access to certain databases",
                    "Right to limit data storage locations"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Individuals can restrict processing when accuracy is contested, processing is unlawful, or data is no longer needed but required for legal claims."
            },
            {
                question: "What constitutes 'special category data'?",
                options: [
                    "Data revealing racial/ethnic origin, political opinions, religious beliefs, genetic data, biometric data, health data, sex life/orientation",
                    "Financial information, credit scores, banking details",
                    "Employment history, educational qualifications, professional certifications",
                    "Online browsing history, shopping preferences, social media activity"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Special category data requires additional protection and lawful bases under Article 9, such as explicit consent or substantial public interest."
            },
            {
                question: "How should consent be obtained under GDPR?",
                options: [
                    "Freely given, specific, informed, unambiguous, with clear affirmative action",
                    "Implied from continued use of service",
                    "Included in terms and conditions",
                    "Assumed unless individual objects"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Consent must be a clear affirmative act, freely given, specific, informed, and unambiguous. Pre-ticked boxes or inactivity don't constitute consent."
            },
            {
                question: "What is the right to object to processing?",
                options: [
                    "Right to object to processing based on legitimate interests or direct marketing",
                    "Right to object to any data processing",
                    "Right to object to data sharing with third parties",
                    "Right to object to data storage methods"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Individuals have absolute right to object to direct marketing, and right to object to processing based on legitimate interests or public task."
            },
            {
                question: "What records must be kept under Article 30?",
                options: [
                    "Records of processing activities including purposes, categories, recipients, retention periods",
                    "Records of all data breaches regardless of severity",
                    "Records of employee training sessions",
                    "Records of software updates and patches"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Article 30 requires controllers and processors (except SMEs with low-risk processing) to maintain records of processing activities."
            },
            {
                question: "What is the role of supervisory authorities?",
                options: [
                    "Monitor and enforce GDPR, provide guidance, handle complaints",
                    "Issue fines for all violations",
                    "Certify all data protection software",
                    "Approve all privacy policies"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Supervisory authorities (like ICO in UK) monitor GDPR application, provide advice, handle complaints, and enforce compliance through investigations and fines."
            },
            {
                question: "What is 'automated decision-making' under GDPR?",
                options: [
                    "Decisions made by automated means without human involvement",
                    "Computer-assisted decision support systems",
                    "Any decision involving technology",
                    "Statistical analysis of data"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Automated decision-making includes profiling that produces legal or similarly significant effects. Individuals have right to human intervention and explanation."
            },
            {
                question: "What are Binding Corporate Rules?",
                options: [
                    "Internal rules for transferring personal data within multinational organisations",
                    "Mandatory policies for all employees",
                    "Industry standards for data protection",
                    "Contractual requirements for suppliers"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "BCRs allow multinational organisations to transfer personal data internationally within their group while ensuring adequate data protection safeguards."
            },
            {
                question: "What is the deadline for responding to a Subject Access Request?",
                options: ["1 month", "2 months", "3 months", "6 months"],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Organisations must respond to SARs within one month, extendable by two additional months for complex or numerous requests."
            },
            {
                question: "What constitutes a personal data breach?",
                options: [
                    "Breach of security leading to accidental or unlawful destruction, loss, alteration, unauthorised disclosure/access",
                    "Any unauthorised access to systems",
                    "Loss of encrypted data",
                    "System downtime affecting data availability"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "A breach includes confidentiality, integrity, or availability breaches. Not all require notification - only those likely to result in risk to rights."
            },
            {
                question: "What are the conditions for international data transfers?",
                options: [
                    "Adequacy decision, appropriate safeguards, specific derogations",
                    "Encryption during transfer, secure storage, regular audits",
                    "Consent from all data subjects, notification to authorities, impact assessment",
                    "Contractual agreements, insurance coverage, compliance certification"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Transfers require adequacy decision, appropriate safeguards (SCCs, BCRs), or specific derogations like explicit consent or contract necessity."
            },
            {
                question: "What is the purpose of certification mechanisms under GDPR?",
                options: [
                    "Demonstrate compliance through approved certification schemes",
                    "Certify all data protection officers",
                    "Approve all privacy software",
                    "Validate all encryption methods"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "Certification mechanisms allow organisations to demonstrate GDPR compliance through approved certification schemes, enhancing trust and transparency."
            },
            {
                question: "What is the accountability principle?",
                options: [
                    "Responsibility to demonstrate compliance with all GDPR principles",
                    "Accountability for all data breaches",
                    "Responsibility to report all processing activities",
                    "Accountability to data subjects for errors"
                ],
                correctAnswer: 0,
                category: "gdpr",
                explanation: "The accountability principle requires controllers to be responsible for, and able to demonstrate, compliance with all GDPR principles."
            }
        ];
    }

    getHealthSafetyQuestions() {
        return [
            {
                question: "What is the main purpose of the Health and Safety at Work Act 1974?",
                options: [
                    "To ensure employers protect health, safety and welfare of employees",
                    "To set minimum wage standards",
                    "To regulate working hours",
                    "To establish trade union rights"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The HSWA 1974 is the primary legislation covering occupational health and safety in Great Britain, imposing duties on employers to ensure employee safety."
            },
            {
                question: "What does RIDDOR stand for?",
                options: [
                    "Reporting of Injuries, Diseases and Dangerous Occurrences Regulations",
                    "Recording of Incidents, Damages and Dangerous Operations Register",
                    "Register of Industrial Diseases and Dangerous Occurrence Reports",
                    "Regulation of Injury Documentation and Dangerous Occurrence Recording"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "RIDDOR 2013 requires reporting of specified workplace incidents to the Health and Safety Executive (HSE), including deaths, major injuries, and dangerous occurrences."
            },
            {
                question: "What is a risk assessment?",
                options: [
                    "Systematic examination of workplace hazards to identify and control risks",
                    "Assessment of employee performance and safety compliance",
                    "Evaluation of workplace productivity and efficiency",
                    "Analysis of insurance requirements and coverage"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Risk assessments identify hazards, evaluate risks, and implement control measures, required by the Management of Health and Safety at Work Regulations 1999."
            },
            {
                question: "What does the hierarchy of control measures prioritize?",
                options: [
                    "Elimination, substitution, engineering controls, administrative controls, PPE",
                    "Training, supervision, monitoring, enforcement, discipline",
                    "Insurance, compensation, rehabilitation, return to work, prevention",
                    "Planning, implementation, evaluation, review, improvement"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The hierarchy prioritizes eliminating hazards first, then substitution, engineering controls, administrative controls, with PPE as last resort."
            },
            {
                question: "What is the maximum recommended weight for manual lifting by one person?",
                options: ["5kg", "10kg", "20kg", "25kg"],
                correctAnswer: 3,
                category: "health-safety",
                explanation: "HSE guidelines suggest 25kg as a general guideline for men lifting at waist height, but individual capability and other factors must be considered."
            },
            {
                question: "What does PUWER stand for?",
                options: [
                    "Provision and Use of Work Equipment Regulations",
                    "Power and Utility Work Equipment Requirements",
                    "Personal Use of Workplace Equipment Rules",
                    "Preventive Use of Work Equipment Regulations"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "PUWER 1998 requires work equipment to be suitable, maintained, inspected, and used only by trained personnel, with adequate safety measures."
            },
            {
                question: "What is the purpose of a method statement?",
                options: [
                    "Detailed description of how potentially dangerous work will be carried out safely",
                    "Statement of company health and safety policy",
                    "Method for reporting accidents and incidents",
                    "Statement of employee health and safety responsibilities"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Method statements describe the sequence of work, precautions, and control measures for high-risk activities, often accompanying risk assessments."
            },
            {
                question: "What does LOLER regulate?",
                options: [
                    "Lifting Operations and Lifting Equipment Regulations",
                    "Licensing of Load Equipment Requirements",
                    "Legal Operations and Load Equipment Rules",
                    "Lifting Operations Licensing and Examination Regulations"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "LOLER 1998 requires lifting equipment to be strong, stable, positioned safely, marked clearly, and thoroughly examined every 6-12 months."
            },
            {
                question: "What is a 'competent person' in health and safety?",
                options: [
                    "Person with sufficient training, experience and knowledge to perform health and safety duties",
                    "Person appointed by management",
                    "Person with health and safety qualification",
                    "Person responsible for accident investigation"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "A competent person has sufficient training, experience, knowledge, and other qualities to properly assist in health and safety matters."
            },
            {
                question: "What are the main requirements of the Work at Height Regulations 2005?",
                options: [
                    "Avoid work at height where possible, use appropriate equipment, ensure competence",
                    "Always use harnesses, restrict access, conduct daily inspections",
                    "Limit height to 2 meters, provide safety nets, supervise all work",
                    "Require medical clearance, use certified equipment, maintain records"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The regulations require avoiding work at height where possible, using appropriate equipment, ensuring competence, and protecting those at risk."
            },
            {
                question: "What is the purpose of a fire risk assessment?",
                options: [
                    "Identify fire hazards and people at risk, evaluate and remove/reduce risks",
                    "Calculate insurance requirements for fire damage",
                    "Determine number and type of fire extinguishers needed",
                    "Plan fire drill schedules and evacuation routes"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Required by the Regulatory Reform (Fire Safety) Order 2005, fire risk assessments identify hazards, evaluate risks, and implement control measures."
            },
            {
                question: "What does COSHH regulate?",
                options: [
                    "Control of Substances Hazardous to Health",
                    "Classification of Safe Handling of Hazards",
                    "Control of Safety and Health Hazards",
                    "Chemical Operations Safety and Health Handling"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "COSHH 2002 requires employers to control exposure to hazardous substances to prevent ill health through risk assessment and control measures."
            },
            {
                question: "What is the purpose of a permit to work system?",
                options: [
                    "Formal written system for controlling high-risk activities",
                    "Permission for employees to work overtime",
                    "Authorization to use specific equipment",
                    "License to work in hazardous environments"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Permit to work systems ensure high-risk activities (like confined space entry) are properly planned, authorized, and controlled by competent persons."
            },
            {
                question: "What are an employer's duties under the Display Screen Equipment Regulations?",
                options: [
                    "Assess workstations, plan breaks, provide eye tests, provide training",
                    "Provide ergonomic chairs, adjustable monitors, footrests, document holders",
                    "Limit screen time, enforce rest periods, monitor usage, provide glasses",
                    "Install anti-glare screens, provide wrist supports, conduct health checks"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The regulations require workstation assessments, adequate breaks, eye tests, and training for regular DSE users."
            },
            {
                question: "What is a 'near miss'?",
                options: [
                    "Incident with potential to cause harm but no injury occurred",
                    "Minor injury requiring first aid only",
                    "Accident that nearly caused serious injury",
                    "Safety violation that was almost detected"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Near misses provide valuable learning opportunities to prevent future incidents and should be reported and investigated like accidents."
            },
            {
                question: "What does the Manual Handling Operations Regulations require?",
                options: [
                    "Avoid hazardous manual handling where possible, assess risks, reduce risks",
                    "Provide mechanical aids for all lifting, train all staff, limit weights",
                    "Require medical assessments, use team lifting, maintain records",
                    "Prohibit lifting over 25kg, provide PPE, supervise all handling"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The regulations require avoiding hazardous manual handling where possible, assessing unavoidable risks, and reducing risks to lowest level."
            },
            {
                question: "What is the purpose of a health and safety policy?",
                options: [
                    "Statement of commitment and arrangements for managing health and safety",
                    "List of safety rules and procedures for employees",
                    "Document outlining legal requirements and penalties",
                    "Plan for emergency response and business continuity"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Required for organisations with 5+ employees, the policy demonstrates commitment and outlines arrangements for managing health and safety."
            },
            {
                question: "What are the key elements of fire safety management?",
                options: [
                    "Fire prevention, means of escape, fire fighting equipment, training and drills",
                    "Smoke detectors, sprinklers, fire doors, emergency lighting",
                    "Risk assessment, equipment maintenance, staff training, emergency plans",
                    "Alarm systems, evacuation procedures, assembly points, fire wardens"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Effective fire safety management includes prevention strategies, adequate means of escape, appropriate equipment, and regular training."
            },
            {
                question: "What is the role of a safety representative?",
                options: [
                    "Represent employees in health and safety matters, inspect workplace, investigate incidents",
                    "Enforce safety rules, issue warnings, report violations",
                    "Conduct risk assessments, develop procedures, deliver training",
                    "Monitor compliance, audit systems, report to management"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Safety representatives (under SRSC Regulations 1977) represent employees, inspect workplaces, investigate incidents, and consult with employers."
            },
            {
                question: "What does the Confined Spaces Regulations 1997 require?",
                options: [
                    "Avoid entry where possible, follow safe system of work, have emergency arrangements",
                    "Always use breathing apparatus, have rescue team on standby, monitor atmosphere",
                    "Restrict entry to trained personnel, use permits, conduct risk assessments",
                    "Provide ventilation, limit entry time, use safety harnesses, maintain communication"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The regulations require avoiding confined space entry where possible, following safe systems of work, and having adequate emergency arrangements."
            },
            {
                question: "What is the purpose of personal protective equipment (PPE)?",
                options: [
                    "Protect against risks that cannot be adequately controlled by other means",
                    "Replace other control measures for convenience",
                    "Comply with insurance requirements",
                    "Standardize safety equipment across industries"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "PPE should be last resort after other controls. The PPE Regulations 1992 require suitable PPE provision, maintenance, and training."
            },
            {
                question: "What are an employer's first aid requirements?",
                options: [
                    "Provide adequate and appropriate equipment, facilities and personnel",
                    "Have at least one first aider per 50 employees, maintain first aid kits",
                    "Provide first aid training to all staff, conduct regular drills",
                    "Appoint a first aid coordinator, maintain records, review annually"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The Health and Safety (First-Aid) Regulations 1981 require adequate first aid provision based on workplace risk assessment."
            },
            {
                question: "What is the purpose of a safety committee?",
                options: [
                    "Promote cooperation between employers and employees on health and safety",
                    "Enforce safety policies, review incidents, recommend disciplinary action",
                    "Develop safety procedures, conduct audits, report to management",
                    "Coordinate emergency response, organize training, maintain equipment"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Safety committees facilitate consultation between employers and employees on health and safety matters, required for workplaces with recognized unions."
            },
            {
                question: "What does the Control of Asbestos Regulations 2012 require?",
                options: [
                    "Manage asbestos in non-domestic premises, prevent exposure, provide information",
                    "Remove all asbestos immediately, use licensed contractors, notify HSE",
                    "Label asbestos materials, restrict access, conduct air monitoring",
                    "Register asbestos locations, train maintenance staff, maintain records"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The regulations require duty holders to manage asbestos in non-domestic premises, prevent exposure, and provide information to those at risk."
            },
            {
                question: "What is the purpose of a noise risk assessment?",
                options: [
                    "Identify employees at risk from noise and implement control measures",
                    "Measure noise levels, provide hearing protection, conduct audiometry",
                    "Document noise exposure, train employees, maintain equipment",
                    "Comply with legal limits, reduce noise at source, monitor exposure"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Required by the Control of Noise at Work Regulations 2005 when daily exposure exceeds 80dB, to identify risks and implement controls."
            },
            {
                question: "What are the main requirements for workplace ventilation?",
                options: [
                    "Provide sufficient fresh or purified air, control temperature, remove contaminants",
                    "Maintain 21°C temperature, provide air conditioning, filter air",
                    "Ensure windows open, use extract fans, monitor air quality",
                    "Prevent drafts, control humidity, clean ventilation systems"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The Workplace (Health, Safety and Welfare) Regulations 1992 require effective ventilation providing sufficient fresh or purified air."
            },
            {
                question: "What is the purpose of a construction phase plan?",
                options: [
                    "Plan and manage health and safety risks during construction work",
                    "Schedule construction activities, coordinate contractors, track progress",
                    "Document safety procedures, list emergency contacts, record inspections",
                    "Allocate responsibilities, specify equipment, define work methods"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Required by CDM 2015, the plan sets out health and safety arrangements for construction projects, prepared by the principal contractor."
            },
            {
                question: "What does the Electricity at Work Regulations 1989 require?",
                options: [
                    "Ensure electrical systems are constructed and maintained to prevent danger",
                    "Use qualified electricians, conduct periodic testing, maintain records",
                    "Provide circuit protection, ground all equipment, use low voltage",
                    "Label electrical hazards, restrict access, provide training"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "The regulations require electrical systems to be constructed and maintained to prevent danger, with work on or near live conductors avoided where possible."
            },
            {
                question: "What is the purpose of a young persons risk assessment?",
                options: [
                    "Consider specific risks to young workers and implement additional protections",
                    "Restrict young workers from hazardous tasks, provide extra supervision",
                    "Assess maturity and competence, provide mentoring, limit working hours",
                    "Require parental consent, conduct medical assessments, provide training"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Required by Management Regulations, considering young workers' lack of experience, awareness of risks, and physical/psychological immaturity."
            },
            {
                question: "What are the main duties of designers under CDM 2015?",
                options: [
                    "Eliminate, reduce or control foreseeable risks through design",
                    "Create detailed drawings, specify materials, coordinate with engineers",
                    "Consider buildability, minimize waste, optimize costs",
                    "Ensure aesthetic appeal, functionality, sustainability"
                ],
                correctAnswer: 0,
                category: "health-safety",
                explanation: "Designers must eliminate foreseeable health and safety risks to those constructing, maintaining, using, or demolishing the structure."
            }
        ];
    }
    
    getManualHandlingQuestions() {
        // 20 questions for Manual Handling
        return [
            {
                question: "What is the recommended maximum weight for lifting at waist height?",
                options: ["5kg", "10kg", "15kg", "25kg"],
                correctAnswer: 3,
                category: "manual-handling",
                explanation: "The HSE recommends 25kg as a general guideline, but individual capability and other factors must be considered."
            },
            // Add 19 more questions...
        ];
    }
    
    getCybersecurityQuestions() {
        return [
            {
                question: "What is phishing?",
                options: [
                    "A type of fishing sport",
                    "Sending fraudulent emails to steal sensitive information",
                    "A network protocol",
                    "A type of computer virus"
                ],
                correctAnswer: 1,
                category: "cybersecurity",
                explanation: "Phishing uses deceptive emails that appear to be from legitimate sources to trick recipients into revealing sensitive information."
            },
            // Add 19 more questions...
        ];
    }
    
    getSafeguardingQuestions() {
        return [
            {
                question: "What does safeguarding mean?",
                options: [
                    "Protecting people's health, wellbeing and human rights",
                    "Securing buildings and property",
                    "Financial protection measures",
                    "Data backup procedures"
                ],
                correctAnswer: 0,
                category: "safeguarding",
                explanation: "Safeguarding involves protecting children and vulnerable adults from abuse, neglect and harm."
            },
            // Add 19 more questions...
        ];
    }
    
    getFoodSafetyQuestions() {
        return [
            {
                question: "What is the danger zone for bacterial growth in food?",
                options: ["0-5°C", "5-63°C", "63-75°C", "Above 75°C"],
                correctAnswer: 1,
                category: "food-safety",
                explanation: "Bacteria multiply rapidly between 5°C and 63°C. Keep food below 5°C or above 63°C to prevent growth."
            },
            // Add 19 more questions...
        ];
    }
    
    getElectricalSafetyQuestions() {
        return [
            {
                question: "What voltage is considered extra low voltage (ELV) in the UK?",
                options: ["Below 50V AC", "Below 120V AC", "Below 230V AC", "Below 400V AC"],
                correctAnswer: 0,
                category: "electrical-safety",
                explanation: "Extra Low Voltage is below 50V AC or 120V DC ripple-free, reducing but not eliminating shock risk."
            },
            // Add 19 more questions...
        ];
    }
    
    getFirstAidQuestions() {
        return [
            {
                question: "What is the primary survey sequence in first aid?",
                options: ["DR ABC", "ABCDE", "SAMPLE", "AVPU"],
                correctAnswer: 0,
                category: "first-aid",
                explanation: "DR ABC: Danger, Response, Airway, Breathing, Circulation. Always check for danger first!"
            },
            // Add 19 more questions...
        ];
    }
    
    getEnvironmentalQuestions() {
        return [
            {
                question: "What does COSHH stand for?",
                options: [
                    "Control of Substances Hazardous to Health",
                    "Committee on Safety and Hazard Handling",
                    "Chemical Operations Safety and Health",
                    "Control of Safety and Hazardous Materials"
                ],
                correctAnswer: 0,
                category: "environmental",
                explanation: "COSHH regulations require employers to control exposure to hazardous substances to prevent ill health."
            },
            // Add 19 more questions...
        ];
    }
    
    getDefaultQuestions() {
        return [
            {
                question: "What should you do in case of an emergency?",
                options: ["Panic", "Follow emergency procedures", "Ignore it", "Take photos"],
                correctAnswer: 1,
                category: "general",
                explanation: "Always follow established emergency procedures and listen to designated safety officers."
            }
        ];
    }
    
    // =============================================
    // HELPER FUNCTIONS
    // =============================================
    
    calculateDifficulty(question) {
        const length = question.question.length;
        const options = question.options.length;
        return length > 100 ? 'Hard' : length > 50 ? 'Medium' : 'Easy';
    }
    
    getRandomPersonality() {
        return this.aiPersonalities[Math.floor(Math.random() * this.aiPersonalities.length)];
    }
    
    getFunFact(category) {
        const funFacts = {
            'fire-safety': '🔥 Did you know? The Great Fire of London in 1666 burned for 3 days and destroyed 13,000 houses!',
            'gdpr': '🔐 Fun fact: GDPR applies to any company processing EU citizens\' data, regardless of where the company is located!',
            'health-safety': '👷 Historical fact: The first UK Factory Act was passed in 1802 to protect child workers!',
            'manual-handling': '💪 Tip: Using your legs instead of your back can reduce lifting strain by up to 70%!',
            'cybersecurity': '🛡️ Did you know? 95% of cybersecurity breaches are due to human error!'
        };
        return funFacts[category] || '💡 Learning something new every day makes you safer!';
    }
    
    generateCorrectExplanation(question, personality) {
        const templates = [
            `Excellent work! ${personality.emoji} ${personality.name} here. Your answer "${question.options[question.correctAnswer]}" is absolutely correct because ${question.explanation.toLowerCase()}`,
            `Perfect! ${personality.emoji} As ${personality.trait}, I can confirm: ${question.explanation}. You've shown great understanding!`,
            `Spot on! ${personality.emoji} ${question.explanation}. This knowledge will serve you well in real-world situations.`,
            `Correct! ${personality.emoji} Here's why: ${question.explanation}. You're building valuable safety expertise!`,
            `Well done! ${personality.emoji} ${personality.name} approves: ${question.explanation}. Keep up the excellent work!`
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    }
    
    generateIncorrectExplanation(question, userAnswer, personality) {
        const userAnswerText = userAnswer >= 0 && userAnswer < question.options.length 
            ? question.options[userAnswer] 
            : "your answer";
            
        const templates = [
            `Good attempt! ${personality.emoji} While "${userAnswerText}" is a common misconception, the correct answer is actually "${question.options[question.correctAnswer]}". Here's why: ${question.explanation.toLowerCase()}`,
            `Almost there! ${personality.emoji} ${personality.name} explains: ${question.explanation}. The correct choice is "${question.options[question.correctAnswer]}".`,
            `Let me clarify: ${personality.emoji} ${question.explanation}. This is why "${question.options[question.correctAnswer]}" is correct.`,
            `Learning moment! ${personality.emoji} ${question.explanation}. Remember this for next time - the right answer was "${question.options[question.correctAnswer]}".`,
            `No worries! ${personality.emoji} Even ${personality.trait} makes mistakes. ${question.explanation}. Correct answer: "${question.options[question.correctAnswer]}"`
        ];
        return templates[Math.floor(Math.random() * templates.length)];
    }
    
    generateLearningTips(question) {
        const tips = [];
        const category = question.category;
        
        if (category === 'fire-safety') {
            tips.push("Regular fire drills save lives - participate actively!");
            tips.push("Know your nearest fire exit and assembly point");
            tips.push("Keep fire doors closed - they're designed that way for a reason!");
        } else if (category === 'gdpr') {
            tips.push("When in doubt about data handling - ask!");
            tips.push("Only collect data you actually need");
            tips.push("Encrypt sensitive information whenever possible");
        } else if (category === 'health-safety') {
            tips.push("Report hazards immediately - don't assume someone else will");
            tips.push("Use PPE correctly - it's there to protect you");
            tips.push("Take regular breaks to prevent fatigue-related accidents");
        }
        
        // Add random general tips
        const generalTips = [
            "Practice makes perfect - review tricky questions",
            "Share your knowledge with colleagues",
            "Stay curious and keep learning",
            "Safety is everyone's responsibility",
            "Small precautions prevent big accidents"
        ];
        
        tips.push(generalTips[Math.floor(Math.random() * generalTips.length)]);
        return tips.slice(0, 3); // Return max 3 tips
    }
    
    checkBadgeEligibility(question) {
        const badges = [];
        const category = question.category;
        
        if (category === 'fire-safety') {
            badges.push({ name: "Fire Safety Expert", icon: "🔥", threshold: 8 });
        } else if (category === 'gdpr') {
            badges.push({ name: "Data Guardian", icon: "🔒", threshold: 7 });
        } else if (category === 'health-safety') {
            badges.push({ name: "Safety Champion", icon: "🛡️", threshold: 9 });
        }
        
        badges.push({ name: "Quick Thinker", icon: "⚡", threshold: 6 });
        return badges;
    }
    
    generateOptionsForFollowUp(previousQuestion, difficulty) {
        const baseOptions = ["Always conduct a full risk assessment", "It depends on the specific circumstances", 
                           "Follow the standard procedure", "Consult the safety manual"];
        
        if (difficulty === 'harder') {
            return [
                "Apply the ALARP principle (As Low As Reasonably Practicable)",
                "Immediately evacuate the area",
                "Contact emergency services first",
                "Assess using the hierarchy of control measures"
            ];
        } else {
            return [
                "Follow established safety procedures",
                "Ask your supervisor for guidance",
                "Check the safety signage",
                "Use common sense approach"
            ];
        }
    }
    
    generatePerformanceSummary(accuracy, averageTime) {
        if (accuracy >= 90) return "Outstanding! You've mastered this topic with exceptional understanding.";
        if (accuracy >= 75) return "Excellent work! You have a strong grasp of the key concepts.";
        if (accuracy >= 60) return "Good progress! You understand the fundamentals well.";
        if (accuracy >= 50) return "Solid foundation! Review the incorrect answers to improve.";
        return "Keep learning! Review the material and try again - you'll get there!";
    }
    
    identifyStrengths(questions) {
        const categories = questions.map(q => q.category);
        const uniqueCategories = [...new Set(categories)];
        
        if (uniqueCategories.length === 1) {
            return [`Strong understanding of ${uniqueCategories[0].replace('-', ' ')} concepts`];
        }
        
        return ["Good analytical skills", "Attention to detail", "Practical application knowledge"];
    }
    
    identifyImprovementAreas(questions) {
        const incorrect = questions.filter(q => !q.userCorrect);
        if (incorrect.length === 0) return ["Continue challenging yourself with advanced topics"];
        
        const categories = incorrect.map(q => q.category);
        const mostCommon = categories.sort((a,b) => 
            categories.filter(v => v === a).length - categories.filter(v => v === b).length
        ).pop();
        
        return [`Review ${mostCommon ? mostCommon.replace('-', ' ') : 'specific'} scenarios`, "Practice time management"];
    }
    
    generateRecommendations(accuracy, averageTime) {
        const recs = [];
        
        if (accuracy < 70) {
            recs.push("Review the training materials again");
            recs.push("Take notes on key concepts");
        }
        
        if (averageTime > 120) { // More than 2 minutes per question
            recs.push("Practice answering questions more quickly");
        } else if (averageTime < 30) {
            recs.push("Take your time to read questions thoroughly");
        }
        
        recs.push("Try the practice quiz again tomorrow");
        recs.push("Discuss challenging topics with colleagues");
        
        return recs.slice(0, 3);
    }
    
    getMotivationalMessage(accuracy) {
        const messages = [
            "Every question you answer makes you safer and more knowledgeable!",
            "Safety excellence is a journey - you're on the right path!",
            "Your commitment to learning protects not just you, but everyone around you!",
            "Knowledge is the best safety equipment you can have!",
            "Well done! Your growing expertise contributes to a safer workplace for all!"
        ];
        
        if (accuracy >= 90) {
            return "🏆 Safety champion! Your expertise is impressive!";
        } else if (accuracy >= 75) {
            return "⭐ Excellent progress! You're becoming a safety expert!";
        } else if (accuracy >= 50) {
            return "👍 Good work! Every correct answer builds your safety knowledge!";
        } else {
            return "💪 Keep going! Learning takes time - you're getting better with every question!";
        }
    }
    
    // Simulate AI thinking delay
    simulateThinkingDelay() {
        return new Promise(resolve => {
            const delay = 500 + Math.random() * 1000; // 0.5-1.5 seconds
            setTimeout(resolve, delay);
        });
    }
    
    // Generate AI-powered summary
    async generateAISummary(quizResults) {
        await this.simulateThinkingDelay();
        
        return {
            timestamp: new Date().toISOString(),
            aiGenerated: true,
            overallScore: quizResults.score,
            totalQuestions: quizResults.total,
            accuracy: (quizResults.score / quizResults.total) * 100,
            timePerQuestion: quizResults.timeSpent / quizResults.total,
            strengths: this.identifyStrengths(quizResults.questions),
            recommendations: this.generateRecommendations(
                (quizResults.score / quizResults.total) * 100,
                quizResults.timeSpent / quizResults.total
            ),
            aiComment: `Based on your performance, I recommend ${quizResults.score >= quizResults.total * 0.8 ? 'progressing to advanced modules' : 'reviewing the foundational concepts'}. Your ${quizResults.weakestCategory ? `understanding of ${quizResults.weakestCategory} could use some reinforcement` : 'knowledge base is well-rounded'}.`,
            nextSteps: [
                "Complete 2 more modules to unlock expert level",
                "Try the timed challenge mode",
                "Review incorrect answers in your learning journal"
            ]
        };
    }
}

// Initialize and export the LLM service
const llmService = new LLMService();
window.llmService = llmService;

