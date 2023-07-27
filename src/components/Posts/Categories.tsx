/** @format */

import { Box, Checkbox, Grid, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
  categoryData: {
    id: string;
    name: string;
    tags: {
      id: string;
      name: string;
    }[];
  };
  setTags: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
      }[]
    >
  >;
};

export default function Categories({ categoryData, setTags }: Props) {
  return (
    <Box>
      <Text fontSize="md" fontWeight="bold" mb={2}>
        {categoryData.name}
      </Text>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}>
        {categoryData.tags.map((tag) => {
          return <MiniTag tag={tag} key={tag.id} setTags={setTags} />;
        })}
      </Grid>
    </Box>
  );
}

function MiniTag({
  tag,
  setTags,
}: {
  tag: { id: string; name: string };
  setTags: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
      }[]
    >
  >;
}) {
  const [checked, setChecked] = React.useState(false);

  return (
    <Checkbox
      isChecked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        if (e.target.checked) {
          setTags((prev) => [...prev, tag]);
        } else {
          setTags((prev) => prev.filter((t) => t.id !== tag.id));
        }
      }}
    >
      {tag.name}
    </Checkbox>
  );
}
