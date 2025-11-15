type Props = {
  character: string;
};

export function CharacterButton({ character }: Props) {
  return (
    <button className="h-20 aspect-square text-2xl rounded border border-white/10">
      {character}
    </button>
  );
}
