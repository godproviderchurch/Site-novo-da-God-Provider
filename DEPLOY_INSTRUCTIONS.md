# Instruções para Configuração do Deploy Automático (GitHub Actions + Hostinger)

Este arquivo contém o passo a passo para conectar seu repositório GitHub com a Hostinger, permitindo que o site seja atualizado automaticamente sempre que você fizer um upload (push) para a branch `main`.

## 1. Configurar os "Segredos" no GitHub

Para que o GitHub consiga acessar seu servidor sem expor suas senhas, você precisa cadastrar as credenciais como "Secrets".

1.  Acesse seu repositório no **GitHub**.
2.  Clique na aba **Settings** (Configurações) no topo.
3.  No menu lateral esquerdo, expanda **Secrets and variables** e clique em **Actions**.
4.  Clique no botão verde **New repository secret**.

## 2. Dados Necessários (Hostinger)

Você precisará criar 3 segredos. Copie os dados abaixo do seu painel da Hostinger (**Arquivos > Contas FTP**).

| Nome do Segredo (Secret Name) | Valor (Secret) / Onde encontrar |
| :--- | :--- |
| **`FTP_SERVER`** | "Hostname" ou "Host FTP" (Ex: `ftp.seudominio.com` ou um IP). |
| **`FTP_USERNAME`** | Seu usuário FTP (Ex: `u123456789`). |
| **`FTP_PASSWORD`** | A senha desse usuário FTP. |

## 3. Atenção ao Diretório de Destino (`server-dir`)

O script de deploy (`.github/workflows/deploy.yml`) está configurado para enviar os arquivos para a raiz (`./`) do usuário FTP que você conectou.

**Recomendação:**
Na Hostinger, crie uma **Nova Conta FTP** e no campo "Diretório", aponte diretamente para a pasta `public_html`.
*   Assim, o script vai jogar os arquivos certinho dentro da pasta pública.

**Se usar o usuário FTP principal (Admin):**
Ele geralmente acessa todas as pastas. Se for o caso, você precisará editar o arquivo `.github/workflows/deploy.yml` e alterar a linha `server-dir` para indicar o caminho completo, por exemplo:
`server-dir: ./domains/SEUDOMINIO.COM/public_html/`

---
**Dúvidas?** Consulte este arquivo sempre que precisar reconfigurar o deploy.
