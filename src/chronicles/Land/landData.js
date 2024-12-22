import { FaCloudSun, FaSun, FaMoon } from 'react-icons/fa';

// Time states for climate interactive
export const timeStates = [
  {
    id: 'morning',
    label: 'Morning',
    temp: '62°F',
    windDirection: 'Ocean → Land',
    conditions: 'Foggy',
    icon: FaCloudSun,
    interactiveLabel: 'Dawn Patterns',
  },
  {
    id: 'afternoon',
    label: 'Afternoon',
    temp: '75°F',
    windDirection: 'Ocean → Land',
    conditions: 'Sunny',
    icon: FaSun,
    interactiveLabel: 'Peak Conditions',
  },
  {
    id: 'night',
    label: 'Night',
    temp: '55°F',
    windDirection: 'Land → Ocean',
    conditions: 'Clear',
    icon: FaMoon,
    interactiveLabel: 'Evening Shift',
  },
];

// Questions for each category
export const categoryQuestions = {
  climate: 'What drives the daily weather?',
  vegetation: 'Where do native plants grow?',
  wildlife: 'Who lives in the canyon?',
  geology: 'What shaped this land?',
  hydrology: 'How does water move?',
};
