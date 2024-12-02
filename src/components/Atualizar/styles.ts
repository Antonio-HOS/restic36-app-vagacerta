import styled from "styled-components/native";

type ButtonProps = {
  $variant?: "primary" | "secondary";
  $noSpacing?: boolean;
};

export const Container = styled.TouchableOpacity<ButtonProps>`
  width: ${({ $noSpacing }) => ($noSpacing ? "max-content" : "90%")};
  height: ${({ $noSpacing }) => ($noSpacing ? "46px" : "46px")};
  padding: ${({ $noSpacing }) => ($noSpacing ? "0px 16px" : "0px 16px")};
  border-radius: 8px;
  gap: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;

  background-color:rgba(25,25,25,0.5);
`;

export const Title = styled.Text<ButtonProps>`
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  text-align: left;
  color: #fff;`;