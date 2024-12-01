import { TouchableOpacityProps } from "react-native";
import { Container, Title } from "./styles";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: "primary" | "secondary";
  noSpacing?: boolean;
}

export function LogOut({
  title,
  variant = "primary",
  noSpacing = false,
  ...others
}: ButtonProps) {
  return (
    <Container {...others} $variant={variant} $noSpacing={noSpacing} >
      <Title>{title}</Title><MaterialIcons name="logout" size={24} color="white" />
    </Container>
  );
}