# soramagic

SoraMagic is an open-source project that simplifies video creation by allowing users to generate videos online with OpenAI's Sora model using text, featuring easy one-click website deployment.
👉 [SoraMagic](https://soramagic.co)

English | [简体中文](https://github.com/nivance/soramagic/blob/main/README.zh-CN.md)


# Project Plan
- ✅ Generate video by words(Use [FakeSoraAPI](https://github.com/SoraWebui/FakeSoraAPI)):

  You can see this feature in main branch or tag version-0.1

- [ ] Login with Google:

  Coming soon

- [ ] Stripe payment：

  Coming soon

- [ ] Add OpenAI’s Sora API：

  Waiting for OpenAI launch Sora's API, then we will launch this feature.


## Quick Started

### Deploy on Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnivance%2Fsoramagic&project-name=soramagic&repository-name=soramagic&external-id=https%3A%2F%2Fgithub.com%2Fnivance%2Fsoramagic%2Ftree%2Fmain)

### 1. Clone project

```bash
git clone git@github.com:nivance/soramagic.git
```

### 2. Install dependencies

```bash
cd soramagic && yarn
#or
cd soramagic && npm install
#or
cd soramagic && pnpm install
```

### 3. modify .env.local postgres config

```bash
# website URL
NEXT_PUBLIC_SITE_URL=http://localhost

POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# openai config
OPENAI_API_KEY=sk-XXXXXX
OPENAI_API_BASE_URL=http://localhost:8081
OPENAI_API_MODEL=sora-1.0-turbo
```

### 4. postgres database

#### 4.1 init

```bash
cd soramagic && npx prisma db push --schema=./src/prisma/schema.prisma
```

#### 4..2. check

```bash
cd soramagic && npx prisma studio --schema=./src/prisma/schema.prisma
```


### 4. Run it

```bash
yarn dev
#or
npm run dev
#or
pnpm dev
```

### 5. Open [http://localhost:3000](http://localhost:3000) with your browser to see it.


# Important
SoraMagic requires [FakeSoraAPI](https://github.com/SoraWebui/FakeSoraAPI) to function properly.

