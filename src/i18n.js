import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define translations
const resources = {
  en: {
    translation: {
      "Welcome to Nagrik": "Welcome to Nagrik",
      "What is Civic Engagement?": "What is Civic Engagement?",
      "Why is Civic Participation Important?": "Why is Civic Participation Important?",
      "What does Nagrik offer?": "What does Nagrik offer?",
      "Upcoming Features": "Upcoming Features",
      "Civic engagement means working to make a difference in the civic life of our communities by actively participating in public matters.":
        "Civic engagement means working to make a difference in the civic life of our communities by actively participating in public matters.",
      "It ensures accountability, improves infrastructure, helps solve local problems, and empowers citizens to build better societies.":
        "It ensures accountability, improves infrastructure, helps solve local problems, and empowers citizens to build better societies.",
    }
  },
  hi: {
    translation: {
      "Welcome to Nagrik": "नागरिक में आपका स्वागत है",
      "What is Civic Engagement?": "नागरिक सहभागिता क्या है?",
      "Why is Civic Participation Important?": "नागरिक भागीदारी क्यों महत्वपूर्ण है?",
      "What does Nagrik offer?": "नागरिक क्या पेश करता है?",
      "Upcoming Features": "आगामी विशेषताएं",
      "Civic engagement means working to make a difference in the civic life of our communities by actively participating in public matters.":
        "नागरिक सहभागिता का मतलब है हमारे समुदायों के नागरिक जीवन में अंतर लाने के लिए सक्रिय रूप से भाग लेना।",
      "It ensures accountability, improves infrastructure, helps solve local problems, and empowers citizens to build better societies.":
        "यह जवाबदेही सुनिश्चित करता है, बुनियादी ढांचे में सुधार करता है, स्थानीय समस्याओं का समाधान करता है और नागरिकों को बेहतर समाज बनाने में सक्षम बनाता है।",
    }
  },
  // Add more languages like bn, mr, ta if needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
