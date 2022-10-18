const fakes = {
  "1234": "http://google.com",
  "4321": "http://leagueoflegends.com",
};

export default (userID: string, urlID: string) => {
  return fakes[urlID];
};
