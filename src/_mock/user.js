import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------
const userData = [
  {
    id: "1",
    avatarUrl: `/static/mock-images/avatars/avatar_1.jpg`,
    name:"YASH1",
    company:"KARO SCAN",
    isVerified: true,
    status: 'ACTIVE',
    role:  'Leader',
  },
  {
    id: "2",
    avatarUrl: `/static/mock-images/avatars/avatar_1.jpg`,
    name:"Ganesh",
    company:"KARO SCAN ",
    isVerified: true,
    status: 'Not Active',
    role:  'Leader',
  }
]
const users = userData.map((data, index) => ({
  id: data.id,
  avatarUrl: data.avatarUrl,
  name:data.name,
  company:data.company,
  isVerified: data.isVerified,
  status: data.status,
  role:  data.role,
}));

export default users;
