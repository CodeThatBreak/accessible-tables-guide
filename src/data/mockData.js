// Generate mock data for table demos
export const generateUsers = (count = 1000) => {
  const firstNames = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "Ethan",
    "Sophia",
    "Mason",
    "Isabella",
    "William",
  ];

  const departments = [
    "Engineering",
    "Design",
    "Marketing",
    "Sales",
    "Support",
    "HR",
    "Finance",
    "Legal",
  ];
  const statuses = ["Active", "Inactive", "Pending"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: firstNames[Math.floor(Math.random() * firstNames.length)],
    email: `user${i + 1}@example.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    salary: Math.floor(Math.random() * 100000) + 50000,
  }));
};

export const SMALL_DATASET = generateUsers(50);
export const LARGE_DATASET = generateUsers(1000);
