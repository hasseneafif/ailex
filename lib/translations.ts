export type Language = 'en' | 'fr';

export const translations = {
  en: {
    // Common
    back: 'Back',
    
    // Home page
    home: {
      title: 'Get {Expert} AI Help\nfor EU Law Compliance',
      description: 'Navigate European labor and compliance law with confidence. Our advanced AI platform ensures your practices follow the latest EU regulations with unprecedented accuracy.',
      stats: {
        accuracy: 'Accuracy Rate',
        availability: 'AI Availability',
        realTime: 'Real-Time Law',
        compliant: 'Law Compliant',
      },
      buttons: {
        startChat: 'Start AI Chat',
        documentAnalyzer: 'Document Analyzer',
      },
    },
    
    // Chat page
    chat: {
      badge: 'AI Legal Assistant',
      title: 'EU Law Compliance Chat',
      subtitle: 'Get instant expert guidance on European labor law',
      greeting: 'Hello! Ask me your EU law questions',
      examples: 'Examples:',
      exampleQuestions: [
        'Is it legal to ask about age in interviews?',
        'What are GDPR requirements for employee data?',
        'Can we enforce mandatory overtime?',
        'How to handle workplace discrimination complaints?',
      ],
      placeholder: 'Type your message...',
      placeholderLimitExceeded: 'Limit exceeded. Try again tomorrow.',
      placeholderUnavailable: 'AI unavailable, try again later.',
      analyzing: 'Analyzing...',
      topics: ['GDPR', 'Employment', 'Contracts', 'Discrimination'],
      topicPrompt: 'Tell me about {topic} regulations in EU law',
      errors: {
        tokenUnavailable: 'Authentication token not available. Please refresh the page.',
        limitExceeded: '⚠️ Daily limit exceeded. Please try again tomorrow.',
        generalError: '❌ Sorry, an error occurred. Please try again later.',
      },
      loading: 'Waking AI up',
      severity: {
        low: 'low',
        medium: 'medium',
        high: 'high',
      },
    },
    
    // PDF Analyzer page
    pdf: {
      badge: 'AI Contract Analyzer',
      title: 'AI PDF Analyzer',
      subtitle: 'Upload employment contracts to detect potential EU labor law compliance issues.',
      upload: {
        title: 'Upload Your Contract',
        description: 'Drag and drop a PDF file here, or click to browse',
        button: 'Choose PDF File',
        selected: 'Selected:',
        errorInvalidFile: 'Please upload a PDF file only.',
        errorSelectValid: 'Please select a valid PDF file.',
      },
      analyze: {
        button: 'Analyze',
        analyzing: 'Analyzing...',
        limitExceeded: 'Limit Exceeded',
        unavailable: 'AI Unavailable',
        title: 'Analyzing contract...',
        subtitle: 'Our AI is reviewing your document for EU law compliance',
        steps: {
          extracting: 'Extracting text...',
          analyzing: 'Analyzing clauses...',
          checking: 'Checking compliance...',
        },
      },
      results: {
        issuesDetected: '{count} issue{plural} detected',
        noIssues: 'No issues detected',
        noIssuesDescription: 'The contract appears compliant with EU labor law.',
        problematicClause: 'Problematic Clause:',
        ready: 'Ready to Analyze',
        readyDescription: 'Upload a PDF contract to start the analysis.',
      },
      errors: {
        tokenUnavailable: 'Authentication token not available. Please refresh the page.',
        noFile: 'No file selected.',
        limitExceeded: '⚠️ Daily limit exceeded. Try again tomorrow.',
        analysisFailed: 'Failed to analyze PDF. Please try again.',
      },
      loading: 'Waking AI up',
      severity: {
        low: 'low',
        medium: 'medium',
        high: 'high',
      },
    },
  },
  
  fr: {
    // Common
    back: 'Retour',
    
    // Home page
    home: {
      title: 'Obtenez une aide IA {experte}\npour la conformité au droit de l\'UE',
      description: 'Naviguez dans le droit du travail et de la conformité européen en toute confiance. Notre plateforme IA avancée garantit que vos pratiques respectent les dernières réglementations de l\'UE avec une précision sans précédent.',
      stats: {
        accuracy: 'Taux de précision',
        availability: 'Disponibilité IA',
        realTime: 'Droit en temps réel',
        compliant: 'Conforme au droit UE',
      },
      buttons: {
        startChat: 'Démarrer le chat IA',
        documentAnalyzer: 'Analyseur de documents',
      },
    },
    
    // Chat page
    chat: {
      badge: 'Assistant juridique IA',
      title: 'Chat de conformité au droit de l\'UE',
      subtitle: 'Obtenez des conseils d\'experts instantanés sur le droit du travail européen',
      greeting: 'Bonjour ! Posez-moi vos questions sur le droit de l\'UE',
      examples: 'Exemples :',
      exampleQuestions: [
        'Est-il légal de poser des questions sur l\'âge lors des entretiens ?',
        'Quelles sont les exigences du RGPD pour les données des employés ?',
        'Pouvons-nous imposer des heures supplémentaires obligatoires ?',
        'Comment traiter les plaintes de discrimination au travail ?',
      ],
      placeholder: 'Tapez votre message...',
      placeholderLimitExceeded: 'Limite dépassée. Réessayez demain.',
      placeholderUnavailable: 'IA indisponible, réessayez plus tard.',
      analyzing: 'Analyse en cours...',
      topics: ['RGPD', 'Emploi', 'Contrats', 'Discrimination'],
      topicPrompt: 'Parlez-moi des réglementations {topic} dans le droit de l\'UE',
      errors: {
        tokenUnavailable: 'Jeton d\'authentification non disponible. Veuillez actualiser la page.',
        limitExceeded: '⚠️ Limite quotidienne dépassée. Veuillez réessayer demain.',
        generalError: '❌ Désolé, une erreur s\'est produite. Veuillez réessayer plus tard.',
      },
      loading: 'Réveil de l\'IA',
      severity: {
        low: 'faible',
        medium: 'moyen',
        high: 'élevé',
      },
    },
    
    // PDF Analyzer page
    pdf: {
      badge: 'Analyseur de contrats IA',
      title: 'Analyseur PDF IA',
      subtitle: 'Téléchargez des contrats de travail pour détecter les problèmes potentiels de conformité au droit du travail de l\'UE.',
      upload: {
        title: 'Téléchargez votre contrat',
        description: 'Glissez-déposez un fichier PDF ici, ou cliquez pour parcourir',
        button: 'Choisir un fichier PDF',
        selected: 'Sélectionné :',
        errorInvalidFile: 'Veuillez télécharger uniquement un fichier PDF.',
        errorSelectValid: 'Veuillez sélectionner un fichier PDF valide.',
      },
      analyze: {
        button: 'Analyser',
        analyzing: 'Analyse en cours...',
        limitExceeded: 'Limite dépassée',
        unavailable: 'IA indisponible',
        title: 'Analyse du contrat...',
        subtitle: 'Notre IA examine votre document pour la conformité au droit de l\'UE',
        steps: {
          extracting: 'Extraction du texte...',
          analyzing: 'Analyse des clauses...',
          checking: 'Vérification de la conformité...',
        },
      },
      results: {
        issuesDetected: '{count} problème{plural} détecté{plural}',
        noIssues: 'Aucun problème détecté',
        noIssuesDescription: 'Le contrat semble conforme au droit du travail de l\'UE.',
        problematicClause: 'Clause problématique :',
        ready: 'Prêt à analyser',
        readyDescription: 'Téléchargez un contrat PDF pour commencer l\'analyse.',
      },
      errors: {
        tokenUnavailable: 'Jeton d\'authentification non disponible. Veuillez actualiser la page.',
        noFile: 'Aucun fichier sélectionné.',
        limitExceeded: '⚠️ Limite quotidienne dépassée. Réessayez demain.',
        analysisFailed: 'Échec de l\'analyse du PDF. Veuillez réessayer.',
      },
      loading: 'Réveil de l\'IA',
      severity: {
        low: 'faible',
        medium: 'moyen',
        high: 'élevé',
      },
    },
  },
} as const;
