// Switch between local and production backend
const localUrl = 'http://localhost:5001'  // Uncomment for local development
const DeployUrl = "https://toodueappbackend-production.up.railway.app"  // Uncomment for production

export const useUrl = DeployUrl  // Use production backend
// export const useUrl = localUrl  // Uncomment this line for local development