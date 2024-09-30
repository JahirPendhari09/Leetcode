import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { boysAndGirls, barf } from 'thememirror';

export const LANGUAGES = [
  {
    id: 1,
    name: "JavaScript",
    label: "JavaScript",
    value: "javascript",
  },
  {
    id: 2,
    name: "Java",
    label: "Java",
    value: "java",
  },
  {
    id: 3,
    name: "Python 3",
    label: "Python",
    value: "python",
  }
];

export const languageMap = {
  javascript: javascript,
  java: java,
  python: python
};

export const themeMap = {
  oneDark: oneDark,
  vscodeDark: vscodeDark,
  boysAndGirls: boysAndGirls,
  barf: barf
};

export const themeOptions = [
  {
    'name': 'vscodeDark',
    'label': 'vscodeDark',
    'value': 'vscodeDark'
  },
  {
    'name': 'oneDark',
    'label': 'oneDark',
    'value': 'oneDark'
  },
  {
    'name': 'boysAndGirls',
    'label': 'darkTown',
    'value': 'boysAndGirls'
  },
  {
    'name': 'barf',
    'label': 'greenTown',
    'value': 'barf'
  }
]

export const dummyQuestion = {
  'id': 1,
  'name': 'Two Sum',
  'difficulty': 'Easy',
  'type': 'array',
  'description': `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
      You may assume that each input would have exactly one solution, and you may not use the same element twice.
      You can return the answer in any order.`,
  'examples': [
    {
      'id': 1,
      'input': {
        'nums': [2, 7, 11, 15],
        'target': 9
      }
      ,
      'output': [0, 1],
      'explanation': 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      'id': 2,
      'input': {
        'nums': [3, 2, 4],
        'target': 6
      },
      'output': [1, 2],
      'explanation': 'Because nums[1] + nums[2] == 6, we return [1, 2].'
    },
  ],
  'constraints': [
    '2 <= nums.length <= 104',
    '-109 <= nums[i] <= 109',
    '-109 <= target <= 109',
    'Only one valid answer exists.'
  ],
  'boilerPlates': [
    {
      "language": "javascript",
      "boilerplate": "function twoSum(nums, target) {\n  // Write your code here and return your result\n} "    },
    {
      "language": "java",
      "boilerplate": "public List<Number> twoSum(int[] nums, int target) {\n  // Write your code here and return your result \n return null; \n}"
    },
    {
      "language": "python",
      "boilerplate": "def two_sum(nums, target):\n  # Write your code here and return your result\n return []"
    }
  ]
}