const names = [
  {
    firstName: false,
    lastName: 2,
  },
  {
    firstName: "Roman",
    lastName: "Kowalski",
  },

  {
    firstName: "Halina",
    lastName: "Malina",
  },
  {
    firstName: "B",
    lastName: "22",
  },
  {
    firstName: "Jan",
    lastName: "Nowak",
  },
  {
    firstName: "Kamil",
    lastName: null,
  },
];

function peopleWithNicknames(names) {
  return names.map((person) => {
    const isFirstNameValid =
      typeof person.firstName === "string" &&
      person.firstName.trim().length >= 3;
    const isLastNameValid =
      typeof person.lastName === "string" && person.lastName.trim().length >= 3;
    if (!isFirstNameValid || !isLastNameValid) {
      return { ...person };
    } else {
      const namePart = person.firstName
        .slice(-3)
        .split("")
        .reverse()
        .join("")
        .toLowerCase();
      const surnamePart = person.lastName
        .slice(0, 3)
        .split("")
        .reverse()
        .join("")
        .toLowerCase();
      const nickname = namePart + surnamePart;
      const finalNickname =
        namePart.charAt(0).toUpperCase() + nickname.slice(1);
      return {
        ...person,
        nickname: finalNickname,
      };
    }
  });
}
const newPerson = peopleWithNicknames(names);

function calculateAges(people) {
  return people
    .filter((person) => person.nickname)
    .map((person, index) => {
      const namesLength = person.firstName.length + person.lastName.length;
      if (namesLength % 2 === 0) {
        return { ...person, age: Math.ceil(namesLength) };
      } else {
        const divider = index === 0 ? 1 : index;
        const keys = Object.keys(person);
        const personKeysLetters = keys.reduce(
          (sum, key) => sum + key.length,
          0
        );
        const personFinalAge = personKeysLetters / divider;
        return { ...person, age: Math.ceil(personFinalAge) };
      }
    });
}

const pplAges = calculateAges(newPerson);
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function countLetters(people, alphabet) {
  return people.map((person) => {
    const letterCounts = {};
    for (const letter of alphabet) {
      letterCounts[letter] = 0;
    }
    const allText =
      `${person.firstName}${person.lastName}${person.nickname}`.toLowerCase();
    for (const letter of allText) {
      if (letter in letterCounts) {
        letterCounts[letter]++;
      }
    }
    const mostCommonLetter = Object.entries(letterCounts).reduce(
      (max, [letter, count]) => (count > max.count ? { letter, count } : max),
      { letter: "", count: 0 }
    );
    //nie musimy w dodatkowy sposob zabezpieczac sie przed remisami, bo sortujemy po kolei po alfabecie, wiec w przypadku remisu nie jest spelniony warunek count > max.count ,
    //  wiec zawsze jako max zostanie w pierwszej kolejnosci zapisana wczesniejsza litera z alfabetu

    return { ...person, mostCommonLetter };
  });
}
const counter = countLetters(pplAges, alphabet);
console.log(counter);
