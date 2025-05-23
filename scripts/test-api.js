// scripts/test-api.js
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_USERNAME = process.env.API_USERNAME;
const API_PASSWORD = process.env.API_PASSWORD;

async function testApiConnection() {
  console.log('🔧 Probando conexión con la API...');
  console.log(`📍 URL: ${API_BASE_URL}`);
  console.log(`👤 Usuario: ${API_USERNAME}`);
  
  if (!API_USERNAME || !API_PASSWORD) {
    console.error('❌ Error: Credenciales no configuradas en .env.local');
    console.log('📝 Crea un archivo .env.local con:');
    console.log('   API_USERNAME=tu_usuario');
    console.log('   API_PASSWORD=tu_contraseña');
    return;
  }

  try {
    // Configurar autenticación básica
    const credentials = Buffer.from(`${API_USERNAME}:${API_PASSWORD}`).toString('base64');
    
    const response = await axios.get(`${API_BASE_URL}/saludo`, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    console.log('✅ Conexión exitosa!');
    console.log('📊 Respuesta:', response.data);
    
    // Probar otros endpoints
    console.log('\n🔍 Probando endpoints adicionales...');
    
    const endpoints = [
      '/competition/list',
      '/driver/list',
      '/team/list'
    ];
    
    for (const endpoint of endpoints) {
      try {
        const testResponse = await axios.get(`${API_BASE_URL}${endpoint}`, {
          headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 5000
        });
        console.log(`✅ ${endpoint}: ${testResponse.status} - ${testResponse.data.length || 'OK'} registros`);
      } catch (error) {
        console.log(`❌ ${endpoint}: ${error.response?.status || 'Error'} - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data:`, error.response.data);
    }
    
    if (error.code === 'ECONNREFUSED') {
      console.error('   🔌 La API no está ejecutándose o la URL es incorrecta');
    }
    
    if (error.response?.status === 401) {
      console.error('   🔐 Error de autenticación - verifica las credenciales');
    }
  }
}

testApiConnection();