
// Pay Level ranges as per 7th CPC
export const PAY_LEVELS = {
  'Level 1': { min: 18000, max: 56900 },
  'Level 2': { min: 19900, max: 63200 },
  'Level 3': { min: 21700, max: 69100 },
  'Level 4': { min: 25500, max: 81100 },
  'Level 5': { min: 29200, max: 92300 },
  'Level 6': { min: 35400, max: 112400 },
  'Level 7': { min: 44900, max: 142400 },
  'Level 8': { min: 47600, max: 151100 },
  'Level 9': { min: 53100, max: 167800 },
  'Level 10': { min: 56100, max: 177500 },
};

export const DA_RATES = {
  'Current (50%)': 0.50,
  'Previous (46%)': 0.46,
  'Custom': -1,
};

export const HRA_RATES = {
  'X Class (30%)': 0.30,
  'Y Class (20%)': 0.20,
  'Z Class (10%)': 0.10,
};

export const TA_RATES = {
  'Normal': 3600,
  'High TPTA': 7200,
};
