import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { composeAsync as asyncComposeMail } from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { incident } = route.params;
  const { name, title, value, city, uf, email, whatsapp } = incident;
  const currency = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value);
  const message = `Olá ${name}, estou em contato pois gostaria de ajudar no caso "${title}" com o valor de ${currency}`;

  const navigateBack = () => {
    navigation.goBack();
  };

  const sendEmail = () => {
    asyncComposeMail({
      subject: `Herói do caso: ${title}`,
      recipients: [email],
      body: message,
    });
  };

  const sendWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${whatsapp}&text=${message}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>
      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {name} de {city}/{uf}
        </Text>
        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{title}</Text>
        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{currency}</Text>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
