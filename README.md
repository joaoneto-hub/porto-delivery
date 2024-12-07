# Documentação do Aplicativo de Delivery Local

## Visão Geral

Este documento descreve o desenvolvimento e funcionalidades do aplicativo de **Delivery Local** voltado para a região de Porto Acre. Este aplicativo conecta clientes a estabelecimentos locais sem realizar pagamentos dentro da plataforma, permitindo que o pagamento ocorra diretamente ao entregador ou estabelecimento.

---

## Funcionalidades Principais

1. **Catálogo de Estabelecimentos**:

   - Lista de restaurantes, farmácias, mercadinhos e outros negócios locais.
   - Cardápios e listas de produtos organizados por categoria.

2. **Gestão de Pedidos**:

   - Montagem de pedidos pelo cliente.
   - Envio de pedidos para os estabelecimentos via notificações push ou WhatsApp.
   - Atualização do status do pedido ("Em preparo", "Saiu para entrega", "Entregue").

3. **Entrega e Retirada**:

   - Opção para o cliente escolher entre entrega ou retirada no local.

4. **Chat ou Contato Direto**:

   - Canal de comunicação para ajustes ou dúvidas sobre o pedido.

5. **Sistema de Avaliações**:
   - Clientes podem avaliar estabelecimentos e produtos.

---

## Estrutura do Projeto

```
delivery-local/
├── frontend/              # Aplicativo para clientes e estabelecimentos
│   ├── src/
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── pages/         # Páginas do app
│   │   ├── services/      # Conexão com backend
│   │   ├── utils/         # Funções utilitárias
│   │   └── App.tsx        # Entrada principal
│   └── package.json       # Dependências do frontend
├── backend/               # Servidor e API
│   ├── src/
│   │   ├── controllers/   # Lógica dos endpoints
│   │   ├── models/        # Modelos de dados
│   │   ├── routes/        # Definição de rotas
│   │   ├── services/      # Regras de negócio
│   │   ├── utils/         # Funções auxiliares
│   │   └── index.ts       # Inicialização do servidor
│   └── package.json       # Dependências do backend
└── README.md              # Documentação do projeto
```

---

## Backend

### Tecnologias Utilizadas

- **Node.js**: Ambiente de execução do backend.
- **TypeScript**: Tipagem estática para maior segurança.
- **Festify.js**: Framework para construção da API.
- **Firebase**:
  - **Firestore**: Armazenamento de dados como estabelecimentos, produtos e pedidos.
  - **Authentication**: Gerenciamento de logins de clientes e estabelecimentos.
  - **Cloud Messaging**: Notificações push em tempo real.

---

### Estrutura da API

#### Endpoints

##### **1. Estabelecimentos**

**Listar estabelecimentos**

- **GET** `/api/establishments`
- **Resposta:**

```json
[
  {
    "id": "1",
    "name": "Restaurante Sabor da Terra",
    "category": "Restaurante",
    "rating": 4.5,
    "location": "Centro",
    "products": [{ "id": "prod1", "name": "Pizza", "price": 25.0 }]
  }
]
```

**Adicionar estabelecimento**

- **POST** `/api/establishments`

```json
{
  "name": "Farmácia Saúde",
  "category": "Farmácia",
  "location": "Bairro Novo"
}
```

**Resposta:**

```json
{
  "message": "Estabelecimento adicionado com sucesso.",
  "id": "2"
}
```

##### **2. Pedidos**

**Criar pedido**

- **POST** `/api/orders`

```json
{
  "consumerId": "123",
  "establishmentId": "1",
  "items": [{ "productId": "prod1", "quantity": 2 }],
  "deliveryOption": "delivery",
  "address": "Rua Principal, 123"
}
```

**Resposta:**

```json
{
  "message": "Pedido criado com sucesso.",
  "orderId": "ord1"
}
```

**Atualizar status do pedido**

- **PATCH** `/api/orders/:orderId`

```json
{
  "status": "Saiu para entrega"
}
```

**Resposta:**

```json
{
  "message": "Status do pedido atualizado."
}
```

##### **3. Avaliações**

**Avaliar estabelecimento**

- **POST** `/api/establishments/:id/reviews`

```json
{
  "rating": 5,
  "comment": "Ótimo atendimento e comida deliciosa!"
}
```

**Resposta:**

```json
{
  "message": "Avaliação registrada com sucesso."
}
```

---

## Frontend

### Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento do aplicativo.
- **Axios**: Para requisições HTTP.
- **Firebase SDK**: Integração com o backend Firebase.

### Principais Telas

1. **Tela Inicial**:

   - Listagem de estabelecimentos com categorias e filtros.

2. **Tela de Produtos**:

   - Cardápio ou lista de produtos do estabelecimento selecionado.

3. **Tela de Pedido**:

   - Detalhes do pedido, endereço de entrega ou instruções para retirada.

4. **Tela de Avaliação**:
   - Formulário para avaliação do estabelecimento após conclusão do pedido.

---

## Configuração do Projeto

### Backend

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/delivery-local.git
   ```
2. Entre na pasta do backend:
   ```bash
   cd delivery-local/backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure o Firebase:

   - Crie um projeto no [Firebase](https://firebase.google.com/).
   - Adicione o arquivo `firebaseConfig.json` em `src/config` com as credenciais do projeto.

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

### Frontend

1. Entre na pasta do frontend:
   ```bash
   cd delivery-local/frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o aplicativo:
   ```bash
   npm start
   ```

---

## Futuras Melhorias

1. **Integração com APIs de Logística**:

   - Adicionar suporte para rastreamento de entregas em tempo real.

2. **Notificações Push Avançadas**:

   - Notificar clientes sobre promoções ou status do pedido.

3. **Relatórios para Estabelecimentos**:
   - Dados detalhados de vendas e desempenho.

---

Essa documentação cobre a base para o desenvolvimento do aplicativo. Caso precise de ajuda com implementação ou detalhamento adicional, é só avisar! 🚀
