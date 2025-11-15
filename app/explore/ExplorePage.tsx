import { CharacterButton } from "./CharacterButton";

export function ExplorePage() {
  const characters = [...new Array(10).keys()].map((value) => "" + value);

  return (
    <div>
      <h1 className="text-lg">Explore</h1>
      <div className="flex gap-2 justify-center flex-wrap">
        {characters.map((character) => (
          <CharacterButton
            character={character}
            key={character}
          ></CharacterButton>
        ))}
      </div>
    </div>
  );
}
