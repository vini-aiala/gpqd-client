import styled from "styled-components";

// Text
export const Heading1 = styled.h1`
  font-size: 3rem;
  color: ${(props) => props.theme.black};
  font-weight: 700;
  margin: 0 0;
`;

export const DetailText = styled.span`
  font-size: 2rem;
  color: ${(props) => props.theme.black};
  font-weight: 400;
  display: inline-block;
  margin-bottom: 1.5rem;
`;

// Inputs
export const Input = styled.input`
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 10px;
  padding: 1.5rem 2rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 400;
  width: 100%;
  outline: none;
`;

// Container
export const Container = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.white};
  border-radius: 15px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
`;

export const CenterSection = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//Buttons
export const ButtonPrimary = styled.button`
  padding: 1rem 3rem;
  margin: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme.primary};
  border-radius: 40px;
  border-width: 0;
  width: 70%;
  cursor: pointer;
`;
