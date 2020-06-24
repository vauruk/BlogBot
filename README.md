## Projeto criado como teste de competencia para Grupo Boticario - Miniblog boticario

- Versão React: </br>

  - react - 16.11.0 </br>
  - react-native - 0.62.2 </br>

- Utilizado </br>

  - React </br>
    - Classe Component </br>
    - Hooks </br>
    - Redux </br>
    - Axios </br>

- Tarefa Listar todos os pokemons </br>
- Acessar as seguintes informações de um pokemon: </Br>
  - HP </Br>
  - Ataque </Br>
  - Defesa </Br>
  - Velocidade Habilidades (abilities) </Br>
  - Pesquisar um pokemon pelo nome Paginação dos resultados </Br></br></br>

* <b>Após baixar do git </B> </Br>
  - yarn install </br>
* Rodando a aplicacao:</br>

  - npx react-native run-ios

* Para rebuildar a aplicacao caso esteja com problemas: </br>
  - watchman watch-del-all && rm -rf node_modules && yarn install && yarn start --reset-cache && rm -rf /tmp/metro-\* </br>

</br>
<b> Funcionamento aplicativo</b></br></br>
  - Aplicativo tem funcionamento simples, faz criacao e autententicacao usando firebase , consumo de noticias eh feito atraves do link:  https://gb-mobile-app-teste.s3.amazonaws.com/data.json , o salvamento do dos dados do blog eh feito no firebase database

</br></br>

Run-> pod install
yarn add react-native-gesture-handler react-native-reanimated react-native-screens redux-thunk redux redux-logger react-native-router-flux react-redux lodash axios @aws-amplify/core crypto-js@3.3.0 moment-timezone native-base react-native-keyboard-aware-scroll-view react-native-reanimated react-native-responsive-fontsize react-native-router-flux react-native-screens redux-persist
@react-native-community/async-storage
