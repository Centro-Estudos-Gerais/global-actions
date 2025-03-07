# Repositório de GitHub Actions da Organização

Este repositório centraliza os arquivos de GitHub Actions utilizados pela organização para automatizar processos relacionados a projetos Quarkus (Java). Ele contém ações para gerar repositórios, compilar bibliotecas, criar imagens Docker e gerenciar versões de projetos.

## Ações Disponíveis

### 1. `generate-quarkus-lib`
Arquivo que gera repositórios de bibliotecas para Quarkus (Java) a partir de um template pré-definido. Essa ação facilita a criação de novas bibliotecas padronizadas.

### 2. `generate-quarkus-app`
Arquivo que gera repositórios de aplicações em Quarkus (Java) a partir de um repositório template. Essa ação garante que novas aplicações sigam um padrão consistente.

### 3. `ci-lib`
Arquivo de referência para a ação homônima localizada em outro projeto. Essa ação compila a biblioteca e envia o artefato gerado para o repositório de bibliotecas da empresa.

### 4. `publish-app`
Arquivo de referência para a ação homônima localizada em outro projeto. Essa ação gera a imagem Docker da aplicação e a envia para o repositório de imagens da empresa.

### 5. `create-release`
Arquivo de referência que automatiza a criação de uma nova versão (release) do projeto. Essa ação facilita o versionamento e a distribuição de novas versões.

## Como Usar

Cada ação está localizada em seu respectivo diretório dentro deste repositório. Para utilizar uma ação em seu projeto, siga os passos abaixo:

1. Clone este repositório ou referencie as ações diretamente em seus workflows do GitHub Actions.
2. Configure os parâmetros necessários no arquivo `.yml` do workflow.
3. Execute o workflow no seu repositório.

Exemplo de uso de uma ação em um workflow:

```yaml
name: Gerar Aplicação Quarkus
on: [push]
jobs:
  generate-app:
    runs-on: ubuntu-latest
    steps:
      - name: Gerar Aplicação Quarkus
        uses: Centro-Estudos-Gerais/global-actions/generate-quarkus-app@v1
        with:
          template-repo: "url-do-template"
          new-repo-name: "nome-do-novo-repositorio"
