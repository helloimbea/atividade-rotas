# ATIVIDADE ANGULAR!
Nessa atividade desenvolvi uma aplicação do 0 em Angular baseada no passo-a-passo dado pelo professor Marcelo.
## O que eu fiz nesse projeto?
Criei duas páginas, uma chamada **user-list** e outra chamada **user-detail**, um service e uma interface "user" baseada na API pública 'https://jsonplaceholder.typicode.com/users'.
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
```
    userById(id: number): Observable<User>{

    return this.http.get<User>(this.apiUrl)

  }
```
Aqui o método retorna um Observable tipado como User[]. Isso significa que ele ainda não contém os dados, mas vai emitir uma lista de usuários quando a requisição HTTP for concluída.
O subscribe é necessário porque o Observable é "lazy", ou seja, ele só executa quando alguém se inscreve. Nesse momento, quando a API responde, o Observable emite os dados e o callback do subscribe é executado.
```
this.userService.getUsers().subscribe(data => {
  this.users = data;
});
```
### Uso do paramMap

```
  ngOnInit() {
    const id = this.activateRoute.snapshot.paramMap.get('id')
    if(id){
    this.userService.userById(parseInt(id)).subscribe((user) => {
      this.user = user;
      this.isLoading = false
      this.cdr.detectChanges();
    });
    }

  }
  ```
