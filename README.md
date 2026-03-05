# Atividade guiada Angular - site com lista de users e detalhes 💻
Nessa atividade desenvolvi uma aplicação do zero em Angular baseada no passo-a-passo dado pelo professor Marcelo.  
O site consiste em uma lista com nomes e dados de email e cidade de usuários extraidos de uma API púplica. Cada usuário tem um botão que abre outra seção com mais detalhes do usuário.
## O que eu fiz nesse projeto?
- Criei duas páginas, uma chamada **user-list** e outra chamada **user-detail**, um service e uma interface "user" baseada na API pública 'https://jsonplaceholder.typicode.com/users'
- Botão para ver detalhes do user
- Criei rotas para /detail, /detail/:id (tela de detalhes do usuário com id carregado), /users (tela de lista com todos os usuários)
- Usei paramMap para capturar o id na rota /details/:id
- Criei informações de carregamento e erro
- Inseri ícones personalizados e mudei o icon do site
- Criei uma search box na tela de lista de usuários, que filtra pelo nome

## Rota dinâmica
Essa atividade usa uma rota dinâmica: /details/:id  
Que fica
```
http://localhost:4200/details/2
```
Ou seja, uma rota dinâmica é uma URL que tem uma parte variável, nesse caso o **id**.  
O uso da rota dinâmica foi muito importante para passar o id de um componente pro outro, permitindo encontrar dados do usuário selecionado.  
### Uso do paramMap
O que é o _paramMap_?
> [!IMPORTANT]
>O paramMap é um objeto que permite acessar os parâmetros definidos na rota (como :id).
Ele lê os valores que estão na URL e permite que o componente utilize esses valores para buscar dados ou executar alguma lógica.  
Nesse caso, usa o id pra buscar as informações do usuário pra depois carregar na tela o nome, email etc.  

Nesse código do **user-detail.ts** eu uso o paramMap pra pegar o id da rota que o **user-list** passou.  
```
  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id') //cria a const id e diz que ela vai ter o valor do id que está na rota.
    if(id){ //se encontrou um id, requisita as informações daquele id
    this.userService.userById(parseInt(id)).subscribe((user) => {
      this.user = user;
      this.isLoading = false
      this.cdr.detectChanges();
    });
    }

  }
  ```

### Uso do Observable
Primeiramente, o que é o Observable?
> No Angular, o Observable representa um fluxo de dados assíncrono. Ele é usado principalmente para lidar com operações que não retornam imediatamente, como requisições HTTP.
Então
> Quando usamos o HttpClient, ele retorna um Observable porque a requisição pode demorar. O Observable só executa quando alguém se inscreve nele através do subscribe.

Nesses dois códigos extraído do **user.service.ts** fiz o uso do observable
```
export class UserService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
```
Aqui o método retorna um Observable tipado como User[]. Isso significa que ele ainda não contém os dados, mas vai emitir uma lista de usuários quando a requisição HTTP for concluída.  
O subscribe é necessário porque o Observable é "lazy", ou seja, ele só executa quando alguém se inscreve. Nesse momento, quando a API responde, o Observable emite os dados e o callback do subscribe é executado.  
Outro lugar que usei o Observable foi no método **userById**  
O método envia uma requisição, como esse dado não é imediato, usamos Observable, quando tiver resposta ele envia os dados, e o subscribe pede pro Observalbe avisar ele quando chegar.
```
    userById(id: number): Observable<User>{

    return this.http.get<User>(this.apiUrl)

  }
```
Exemblo de **subscribe**:  
```
this.userService.getUsers().subscribe(data => {
  this.users = data;
});
```

## Considerações finais
Gostei muito desse projeto, por a mão na massa realmente me ajudou a entender melhor os conceitos do Angular e como fazer uma boa página do zero.  
Fiquei bem satisfeita com o resultado final e o processo todo foi muito gostoso!  
A versão atual está assim:  
### Tela principal de users
![Screenshot of the final site](/src/img/print-site-users.png)
### Tela de detalhes do usuário
![Screenshot of the final site](/src/img/print-site-details.png)

