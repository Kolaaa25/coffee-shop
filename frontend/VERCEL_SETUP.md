# Vercel Configuration для Coffee Shop Frontend

## Build Settings

### Root Directory
```
frontend
```

### Framework Preset
```
Vite
```

### Build Command
```
npm run build
```

### Output Directory
```
dist
```

### Install Command
```
npm install
```

## Environment Variables (додати в Vercel Dashboard)

```bash
VITE_API_URL=https://your-backend-url.onrender.com
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
```

## Deployment Steps

1. Імпортуйте проект з GitHub
2. Виберіть репозиторій `coffee-shop`
3. Встановіть Root Directory на `frontend`
4. Додайте Environment Variables
5. Натисніть Deploy

## Auto-deployment

При кожному push в GitHub, Vercel автоматично:
- Збирає новий білд
- Запускає тести
- Деплоїть нову версію

## Custom Domain (опціонально)

1. Перейдіть в Settings → Domains
2. Додайте ваш домен
3. Налаштуйте DNS записи згідно інструкцій Vercel
