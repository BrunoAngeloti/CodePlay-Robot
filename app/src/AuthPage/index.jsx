import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/initSupabase';
import { useNavigation } from '@react-navigation/native';

import { Container, StyledInput, StyledButton, ButtonText, ToggleText } from './styles';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const navigation = useNavigation();

  const cleanFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setAge('');
    setIsSignUp(false);
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const login = async () => {
    const { error: errorSignIn } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (errorSignIn) {
      alert(errorSignIn.message);
      return { error: true };
    }

    return { error: false };
  }

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return { error: true };
    }

    insertUser({ userId: data.user.id });
    return { error: false };
  }

  const insertUser = async ({ userId }) => {
    const { insertError } = await supabase
      .from('users')
      .insert([{ id: userId, name: name, age: parseInt(age), email: email, score: 0, completed_challenges: [] }]);

    if (insertError) {
      alert(insertError.message);
      return;
    } 

    
  }

  const handleLoginOrSignUp = async () => {
    if (isSignUp) {
      const response = await signUp();    
      if (response.error) {
        return
      }
    } 

    const response = await login();
    if (response.error) {
      return;
    }

    cleanFields();
    navigation.navigate('Home');
  };
  

  return (
    <Container>
      <StyledInput placeholder="Email" onChangeText={setEmail} value={email} />
      <StyledInput
        placeholder="Senha"
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
      />
      {isSignUp && (
        <>
          <StyledInput placeholder="Nome" onChangeText={setName} value={name} />
          <StyledInput
            placeholder="Idade"
            onChangeText={setAge}
            keyboardType="numeric"
            value={age}
          />
        </>
      )}
      <StyledButton onPress={handleLoginOrSignUp}>
        <ButtonText>{isSignUp ? 'Criar Conta' : 'Login'}</ButtonText>
      </StyledButton>
      <TouchableOpacity onPress={toggleSignUp}>
        <ToggleText>{isSignUp ? 'Já tem conta? Entrar' : 'Criar conta'}</ToggleText>
      </TouchableOpacity>
    </Container>
  );
};

export default AuthPage;
