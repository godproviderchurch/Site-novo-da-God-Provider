# Mapa de Imagens do Site 🗺️

Este documento guia você para alterar qualquer imagem do site.
Todas as alterações devem ser feitas no arquivo: **`public/content.json`**.

---

## 🌐 Configurações Globais
Imagens que aparecem no site todo.
- **Logo (Versão Branca)**
  - **Onde editar:** `site_config` -> `logo_white`
  - *Usada no Menu Principal e no Rodapé.*

---

## 🏠 Página Inicial (Home)

### 1. Capa (Hero)
- **Imagem de Fundo**
  - **Onde editar:** `home` -> `hero` -> `backgroundImage`

### 2. Seção Identidade (Sobre)
- **Grid de Fotos**
  - **Foto 1 (Topo):** `home` -> `identity` -> `images` -> (Item 1)
  - **Foto 2 (Baixo):** `home` -> `identity` -> `images` -> (Item 2)

### 3. Carrossel de Ministérios
As imagens ficam dentro da lista de ministérios (`home` -> `ministriesSection` -> `list`).
- **Impulse:** Item com id "1" -> campo `image`
- **Raise:** Item com id "2" -> campo `image`
- **Únicas:** Item com id "3" -> campo `image`
- **Kids:** Item com id "4" -> campo `image`
- *(E assim por diante para cada ministério)*

### 4. Nossas Unidades (Locations)
- **Unidade Goiânia:** `home` -> `locations` -> `items` (Item 1) -> `image` (se houver)
- *(Geralmente na Home é apenas texto/mapa, mas se tiver foto, é aqui)*

### 5. Youtube (Vídeos)
As thumbnails são puxadas automaticamente se o ID estiver certo, mas podem ser forçadas manualmente.
- **Vídeo 1:** `home` -> `latest_videos` (Item 1) -> `thumbnail`
- **Vídeo 2:** `home` -> `latest_videos` (Item 2) -> `thumbnail`

---

## 📖 Página Sobre (About)

### 1. Cabeçalho
- **Banner Principal:** `about` -> `header` -> `heroImage`

### 2. Liderança (Leadership)
- **Foto Pastores Seniores (Heber e Rayssa):**
  - **Onde editar:** `about` -> `leadership` -> `items` (Item com id "senior") -> `image`
  
- **Outros Pastores:**
  - **Fundadores:** `about` -> `leadership` -> `items` (Item com id "founder") -> `image`
  - **Campus Pastors:** `about` -> `leadership` -> `items` (Item com id "campus") -> `image`
  - **Lead Pastor:** `about` -> `leadership` -> `items` (Item com id "lead") -> `image`

---

## 🔥 Página Ministérios (Ministries)

### Lista de Ministérios
Segue a mesma lógica da Home, mas na seção dedicada.
- **Onde editar:** `ministries` -> `list`
- Cada item `{ title: "...", image: "..." }` representa um card.

---

## 🌍 Página Missões (Missions)

### 1. Filosofia
- **Imagem Lateral:** `missions` -> `philosophy` -> `image`

### 2. Projetos Missionários
Lista de projetos em `missions` -> `projects`.
- **Sertão:** Item 1 -> `image`
- **África:** Item 2 -> `image`
- **Nepal:** Item 3 -> `image`
- **Europa:** Item 4 -> `image`

---

## 📍 Página Unidades (Locations)

### Lista de Unidades
- **Goiânia (Card):** `locations_page` -> `campuses` (Item id "goiania") -> `image`
- **Sarasota (Card):** `locations_page` -> `campuses` (Item id "sarasota") -> `image`

---

## ⚡ Páginas Internas Exclusivas

### Impulse (Jovens)
- **Capa/Banner:** `impulse_page` -> `image`

### Únicas (Mulheres)
- **Capa/Banner:** `unicas_page` -> `image`

### Cultos de Domingo
- **Capa/Banner:** `sunday_service_page` -> `hero_image`
