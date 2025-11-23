# Render Configuration для Coffee Shop Backend

## Web Service Settings

### Service Details
```
Name: coffee-shop-backend
Region: Frankfurt (EU Central) - найближчий до України
Runtime: Node
```

### Repository
```
GitHub: Kolaaa25/coffee-shop
Branch: main
Root Directory: backend
```

### Build & Start
```
Build Command: npm install
Start Command: npm start
```

### Health Check
```
Health Check Path: /api/health
```

## Environment Variables

⚠️ **ВАЖЛИВО**: Додайте всі ці змінні в Render Dashboard → Environment

### Основні налаштування
```bash
NODE_ENV=production
PORT=5001
```

### Frontend URL (оновити після створення Vercel)
```bash
FRONTEND_URL=https://your-app.vercel.app
```

### JWT Secret
```bash
# Згенеруйте сильний ключ (мінімум 32 символи)
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long_12345
```

### Stripe (Test mode)
```bash
# Отримайте з https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_51QMlIH...
STRIPE_WEBHOOK_SECRET=whsec_...  # Опціонально
```

### Email Configuration
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password  # Gmail App Password!
EMAIL_FROM=your-email@gmail.com
```

## Як отримати Gmail App Password

1. Перейдіть на https://myaccount.google.com/security
2. Увімкніть 2-Step Verification
3. Знайдіть "App passwords" (Паролі додатків)
4. Виберіть "Mail" і згенеруйте пароль
5. Скопіюйте 16-значний пароль (без пробілів) в EMAIL_PASS

## Deployment

1. Після налаштування натисніть "Create Web Service"
2. Render автоматично:
   - Клонує репозиторій
   - Встановить залежності
   - Запустить сервер
   - Виділить публічний URL

## Free Tier Limitations

⚠️ Безкоштовний план має обмеження:
- Сервіс засинає після 15 хвилин неактивності
- Перший запит після сну займе 30-50 секунд
- 750 годин роботи на місяць (достатньо для 1 сервісу)

## Manual Deploy

Якщо потрібно перезапустити:
1. Dashboard → Ваш сервіс
2. Manual Deploy → Deploy latest commit

## Logs

Для відладки:
1. Dashboard → Ваш сервіс
2. Logs (верхнє меню)
3. Перегляньте останні логи

## Monitoring

Render автоматично:
- Моніторить health check
- Перезапускає при падінні
- Показує метрики CPU/Memory

## Production Checklist

- [ ] Всі Environment Variables встановлені
- [ ] Gmail App Password створений
- [ ] Stripe Test keys додані
- [ ] Health check endpoint працює
- [ ] CORS налаштований правильно
- [ ] Frontend URL оновлений після деплою Vercel

## Testing

Після деплою перевірте:

```bash
# Health check
curl https://your-app.onrender.com/api/health

# Menu endpoint
curl https://your-app.onrender.com/api/menu

# Expected: JSON з меню
```

## Troubleshooting

### Сервіс не запускається
1. Перевірте логи
2. Переконайтеся що всі змінні встановлені
3. Перевірте package.json scripts

### CORS помилки
1. Переконайтеся що FRONTEND_URL правильний
2. Перевірте що URL без trailing slash

### Email не працює
1. Використовуйте App Password, не звичайний пароль
2. Переконайтеся що 2FA увімкнена
3. Перевірте логи для помилок

## Update Deployment

При push в GitHub:
1. Render автоматично виявить зміни
2. Запустить новий білд
3. Замінить стару версію

Або вручну:
```bash
git push origin main
# Render автоматично задеплоїть
```

---

**URL після деплою**: `https://coffee-shop-backend-xxxx.onrender.com`
