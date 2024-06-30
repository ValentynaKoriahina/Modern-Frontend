const config = {
  // Services
  EXERCISES_SERVICE: "https://chess-2-load-balancer-891026373.eu-north-1.elb.amazonaws.com",
  // EXERCISES_SERVICE: "http://localhost:8080",
  USERS_SERVICE: 'http://localhost:3000',
  UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;
