import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '../../lib/initSupabase';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Novo estado para controlar a exibição dos campos adicionais

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
      return;
    }
  }

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    insertUser({ userId: data.user.id });
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
      await signUp();    
    } 

    await login();
  };
  

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Senha" onChangeText={setPassword} secureTextEntry={true} value={password} />

      {isSignUp && (
        <>
          <TextInput style={styles.input} placeholder="Nome" onChangeText={setName} value={name} />
          <TextInput style={styles.input} placeholder="Idade" onChangeText={setAge} keyboardType="numeric" value={age} />
        </>
      )}

      <Button title={isSignUp ? "Criar Conta" : "Login"} onPress={handleLoginOrSignUp} />

      <TouchableOpacity onPress={toggleSignUp}>
        <Text style={styles.toggleText}>{isSignUp ? "Já tem conta? Entrar" : "Criar conta"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  toggleText: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  },
});

export default AuthPage;
