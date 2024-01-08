const TelegramBot = require('node-telegram-bot-api');
const token = '6893503836:AAHtbDFpstKGhR4n94OrrvIPPl0DhmvJ2Kg';

const bot = new TelegramBot(token, { polling: true });

const webApp = () => {
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
      await bot.sendMessage(
        chatId,
        "Bu bot sammi.ac dagi telegram bot kursi o'quvchisi tomonidan yaratildi",
        {
          reply_markup: {
            keyboard: [
              [
                {
                  text: "Kurslarni ko'rish",
                  web_app: {
                    url: 'https://telegram-web-bot-mu.vercel.app/',
                  },
                },
              ],
            ],
          },
        }
      );
    }

    if (msg.web_app_data?.data) {
      try {
        const data = JSON.parse(msg.web_app_data?.data);

        await bot.sendMessage(
          chatId,
          "Bizga ishonch bildirganingiz uchun raxmat, siz sotib olgan kurslarni ro'yhati"
        );

        for (item of data) {
          await bot.sendPhoto(chatId, item.Image);
          await bot.sendMessage(chatId, `${item.title} - ${item.quantity}x`);
        }

        await bot.sendMessage(
          chatId,
          `Umumiy narx - ${data
            .reduce((a, c) => a + c.price * c.quantity, 0)
            .toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}`
        );
      } catch (error) {
        console.log(error);
      }
    }
  });
};

webApp();
