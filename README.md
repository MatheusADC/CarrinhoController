# <img src="https://github.com/user-attachments/assets/caabfdf0-0f9e-44a3-8200-c6579fe87887" alt="Ícone de descrição" width="28"> Descrição
O código apresenta um app para mobile que utiliza **React Native** e que se conecta ao bluetooth da placa Arduino UNO R4 Wi-fi para controlar um carrinho de controle remoto.

# <sub><img src="https://github.com/user-attachments/assets/9cbe287f-e23c-4ea6-9119-c0612c0b9dc3" alt="Ícone de celular" width="32"></sub> Páginas
| Tela 1 | Tela 2 | Tela 3 |
|--------|--------|--------|
| <img src="https://github.com/user-attachments/assets/6397fb33-177f-4df5-9434-b532dbfe7ff5" alt="Tela 1" height="400"> | <img src="https://github.com/user-attachments/assets/7f034e91-3e3c-4284-80c4-a5b8c5df2f67" alt="Tela 2" height="400"> | <img src="https://github.com/user-attachments/assets/db939c9d-20bd-4e73-9832-7644e43a69d1" alt="Tela 3" height="400"> |


# <sub><img src="https://github.com/user-attachments/assets/dc744b8e-af75-4901-bd4b-f05ad783a0f5" alt="Ícone de terminal" width="32"></sub> Comandos
### Criar um projeto 
```
npx create-expo-app -t expo-template-blank-typescript
```
### Inicializar projeto (criar pasta android para build)
```
npx react-native init <nome_projeto>
```
### Visualizar projeto no emulador Android Visual Studio
```
npx expo start
```
### Gerar o arquivo .apk de release
```
$env:JAVA_HOME = "caminho_do_java_jdk"
$env:ANDROID_HOME = "caminho_do_android_jdk"
cd android
.\gradlew assembleRelease
```

# <sub><img src="https://github.com/user-attachments/assets/ac29de52-9cd6-4963-8b6a-b329e339622a" alt="Ícone de carrinho de controle remoto" width="36"></sub> Projeto do Carrinho
[Clique aqui](https://github.com/MatheusADC/RobGol)
