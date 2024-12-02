import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";
import FontAwesome from '@expo/vector-icons/FontAwesome';


interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: "primary" | "secondary";
  noSpacing?: boolean;
}

export function Atualizar({
  title,
  variant = "primary",
  noSpacing = false,
  ...others
}: ButtonProps) {
  return (
    <Container {...others} $variant={variant} $noSpacing={noSpacing}>
      <Title $variant={variant}>{title}</Title><FontAwesome name="refresh" size={24} color="white" />
    </Container>
  );
}