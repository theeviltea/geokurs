import { useEffect, useRef, useState } from 'react';
import { CallStrip, Checklist, Grid, HelpLayout, Method, Note, Quote, Section, Stat } from '../components/help/HelpBlocks';
import s from '../components/help/Help.module.css';
import { CREDIT_SVG, DOC_SVG, METRO_SVG, PAY_SVG, ROUTE_SVG, SHIELD_SVG } from '../components/help/art';
import { Icon } from '../components/Icon';
import { SmartLink } from '../components/SmartLink';
import { Steps } from '../components/services/ServiceBlocks';
import { img } from '../data/images';

export function DeliveryPage() {
  return (
    <HelpLayout title="Доставка" hero={{ art: ROUTE_SVG, lede: 'Доставляем заказы по всему Казахстану курьерской службой. Купленный товар можно обменять или вернуть в течение 14 дней.',
      badges: [['gift', 'Бесплатно от 40 000 ₸'], ['calendar', 'На следующий день'], ['refresh', 'Обмен и возврат 14 дней']] }}>
      <Section title="Способы получения">
        <Grid cols={2}>
          <Method icon="store" title="Самовывоз" text="Если вы в городе, где есть наш офис, и можете приехать в рабочее время." tag="Удобно в 7 городах"
            points={['Пн–Пт, с 09:00 до 18:00', 'Посмотрите покупку вживую и проверите комплектность', 'Получите консультацию специалиста на месте']} />
          <Method icon="truck" title="Доставка курьером" text="По Казахстану — курьерской службой до вашего адреса." tag="Бесплатно от 40 000 ₸"
            points={['С 10:00 до 18:00 на следующий день после подтверждения заказа менеджером', 'Или в любой другой согласованный день', 'Доставку день в день уточняйте у менеджера']} />
        </Grid>
      </Section>
      <Steps title="Как это работает" steps={[
        { icon: 'cart', title: 'Заказ', text: 'Оформите на сайте или по телефону' }, { icon: 'call', title: 'Подтверждение', text: 'Менеджер свяжется и уточнит детали' },
        { icon: 'truck', title: 'Доставка', text: 'На следующий день, с 10:00 до 18:00' }, { icon: 'box', title: 'Получение', text: 'Проверьте товар при курьере' }]} />
      <Section title="Обмен и возврат">
        <div className={s.ret}>
          <Stat eyebrow="Обмен и возврат" big="14" unit="дней" text="после получения товара" />
          <Checklist title="При условии, что:" items={[['box', 'Сохранён товарный вид изделия'], ['shield', 'Сохранена транспортная упаковка'], ['check', 'На месте гарантийные наклейки']]} />
        </div>
      </Section>
      <Section title="Важно знать">
        <Grid cols={2}>
          <Note icon="card" title="Безналичная оплата" text="Отправляем заказ на следующий день после поступления денег на наш расчётный счёт." />
          <Note icon="wrench" title="Гарантийное обслуживание" text="В нашем сервисном центре: г. Алматы, ул. Абая, 150. Доставка товара в сервисный центр — за счёт покупателя." />
        </Grid>
      </Section>
    </HelpLayout>
  );
}

export function PaymentPage() {
  return (
    <HelpLayout title="Оплата" hero={{ art: PAY_SVG, lede: 'Выберите удобный способ: наличные или Kaspi QR, банковский перевод для юрлиц или онлайн-оплата картой.',
      badges: [['qr', 'Kaspi QR'], ['doc', 'Счёт для юрлиц'], ['lock', 'Защищённая оплата картой']] }}>
      <Section title="Способы оплаты">
        <Grid cols={3}>
          <Method icon="wallet" title="Наличными или Kaspi QR" text="При самовывозе или при доставке — оплата через Kaspi Pay." logo={{ src: img('kaspi-pay.png'), alt: 'Kaspi Pay' }}
            points={['После оформления пришлём QR-код для оплаты на ваш телефон', 'Заказ отправим курьером сразу после полной оплаты']} />
          <Method icon="doc" title="По счёту для юрлиц" text="Банковский перевод для компаний." tag="Юрлица"
            points={['Выставим счёт на оплату и пришлём его на e-mail', 'Отправим заказ на следующий день после поступления денег']} />
          <Method icon="card" title="Онлайн картой" text="Visa и Mastercard любого банка — мгновенно и безопасно." tag="Visa · Mastercard"
            points={['Защищённая платёжная страница CloudPayments', 'Подтверждение по 3-D Secure']} />
        </Grid>
      </Section>
      <Steps title="Как проходит онлайн-оплата" lede="После подтверждения заказа откроется защищённое окно процессингового центра CloudPayments." steps={[
        { icon: 'check', title: 'Подтвердите заказ', text: 'Выберите оплату картой' }, { icon: 'lock', title: 'Защищённое окно', text: 'Страница CloudPayments' },
        { icon: 'card', title: 'Данные карты', text: 'Номер, имя владельца, срок и код CVV2/CVC2' }, { icon: 'sms', title: '3-D Secure', text: 'Введите код из SMS от банка' }]} />
      <Section title="Безопасность">
        <div className={s.secure}>
          <svg aria-hidden="true" className={s.secureRings} viewBox="0 0 320 320" fill="none"><circle cx="160" cy="160" r="158" stroke="#227831" strokeOpacity="0.1" /><circle cx="160" cy="160" r="100" stroke="#227831" strokeOpacity="0.1" /></svg>
          <div className={s.secureText}>
            <span><Icon name="shield" size={24} stroke={1.8} /></span>
            <b>Данные карты под защитой</b>
            <p>Оплата проходит по правилам Visa и Mastercard: данные передаются по закрытым каналам с шифрованием и вводятся только на платёжной странице CloudPayments.</p>
          </div>
          <div className={s.secureList}>
            <div><b>3-D Secure</b><span>Однозначно подтверждает, что платит владелец карты, и снижает риск мошенничества.</span></div>
            <div><b>CVV2 / CVC2</b><span>Трёхзначный код безопасности на обратной стороне карты.</span></div>
          </div>
        </div>
      </Section>
      <Section title="Важно знать">
        <Grid cols={2}>
          <Note icon="refresh" title="Возврат денег" text="Деньги возвращаются тем же способом, которым была произведена оплата." />
          <Note icon="sms" title="Не пришёл код 3-D Secure?" text="Обратитесь в банк, который выпустил вашу карту: он настраивает отправку кодов." />
        </Grid>
      </Section>
    </HelpLayout>
  );
}

export function WarrantyPage() {
  return (
    <HelpLayout title="Гарантия на товар" hero={{ art: SHIELD_SVG, lede: 'Фирменная гарантия производителя на всё оборудование и возврат денег, если покупка не подошла.',
      badges: [['shield', 'Гарантия производителя'], ['refresh', 'Возврат 14 дней'], ['wallet', 'Деньги за 10 рабочих дней']] }}>
      <Section title="Фирменная гарантия от производителя" lede="Перед отправкой наши специалисты обязательно проводят контроль качества.">
        <Grid cols={2}>
          <Checklist title="Перед отправкой проверяем:" items={[['box', 'Комплектность'], ['zap', 'Работоспособность'], ['eye', 'Упаковка и внешний вид без дефектов']]} />
          <Note icon="doc" title="Гарантийный талон в комплекте" text="Срок гарантии зависит от производителя и устанавливается заводом-изготовителем." />
        </Grid>
      </Section>
      <Steps title="Если прибор сломался" steps={[
        { icon: 'call', title: 'Обращение', text: 'Свяжитесь с нами по телефону или в WhatsApp' }, { icon: 'truck', title: 'Передача в СЦ', text: 'Отправьте прибор в сервисный центр в Алматы' },
        { icon: 'cpu', title: 'Проверка', text: 'Специалисты проведут диагностику' }, { icon: 'doc', title: 'Заключение', text: 'Причины поломки и ремонт по гарантии' }]} />
      <Section title="Гарантия возврата денег" lede="Если оборудование не подошло, примем его в установленный законом срок.">
        <div className={s.stack}>
          <Grid cols={2}>
            <Stat big="14" unit="дней" text="чтобы вернуть товар" />
            <Stat big="10" unit="рабочих дней" text="на возврат денег после заявления" />
          </Grid>
          <Grid cols={3}>
            <Method icon="wallet" title="Наличными" text="В офисе, где была сделана покупка." points={['Сохраните фискальный чек и документы, выданные при покупке']} />
            <Method icon="card" title="Банковской картой" text="На карту, с которой была оплата." points={['Срок зачисления зависит от банка']} />
            <Method icon="doc" title="Безналичным расчётом" text="На расчётный счёт юридического лица." points={['По реквизитам из заявления на возврат']} />
          </Grid>
        </div>
      </Section>
      <Section title="Возврат товара">
        <Grid cols={2}>
          <Method icon="check" title="Надлежащего качества" text="Можно вернуть в течение 14 дней, если товар не был в употреблении." tag="14 дней"
            points={['Сохранены товарный вид, фирменная упаковка, пломбы и ярлыки', 'Есть гарантийный талон и инструкция по эксплуатации', 'Расходы на доставку могут быть вычтены из суммы возврата']} />
          <Method icon="shield" title="Ненадлежащего качества" text="Дефект обнаружен при распаковке или в первые дни работы." tag="Полный возврат"
            points={['Вернём полную сумму или бесплатно заменим товар на аналогичный', 'Если дефект возник из-за нарушения правил эксплуатации, хранения или действий третьих лиц — экспертиза и доставка за счёт покупателя']} />
        </Grid>
      </Section>
      <Section title="Как оформить возврат">
        <Grid cols={2}>
          <Note icon="filedoc" title="Заполните заявление" text="Заявление на возврат денежных средств — скачайте и заполните его перед отправкой товара." />
          <Note icon="pin" title="Отправьте товар в сервисный центр" text="Алматы, пр. Абая, 150, 1А · +7 727 229 00 00, 248 38 12/15. Упакуйте так, чтобы сохранить товарный вид." />
        </Grid>
      </Section>
      <Quote>Качественный сервис — основа стратегии развития «Геокурс». При любых вопросах мы приложим максимум усилий для их решения.</Quote>
    </HelpLayout>
  );
}

export function CreditPage() {
  return (
    <HelpLayout title="Покупка в кредит" hero={{ art: CREDIT_SVG, lede: 'Работаем с банками Казахстана, чтобы предложить заказчикам максимально выгодные условия.',
      badges: [['percent', 'Kaspi Bank для физлиц'], ['calendar', 'Рассрочка 0% для юрлиц'], ['wallet', 'Минимальная предоплата']] }}>
      <Section title="Способы">
        <Grid cols={3}>
          <Method icon="percent" title="Кредит через Kaspi Bank" text="Для физических лиц." tag="Физлица" points={['Товары с пометкой «Купить в кредит»', 'Каталог товаров в кредит постоянно пополняется']} />
          <Method icon="calendar" title="Рассрочка без процентов" text="Для юридических лиц." tag="0% · до 3 мес." points={['До 3 месяцев без переплаты', 'Условия обсудим по телефону']} />
          <Method icon="wallet" title="Минимальная предоплата" text="На срок поставки оборудования." points={['Остаток оплачиваете при получении', 'Удобно для оборудования под заказ']} />
        </Grid>
      </Section>
      <Steps title="Как купить в кредит" steps={[
        { icon: 'search', title: 'Выберите товар', text: 'С пометкой «Купить в кредит»' }, { icon: 'cart', title: 'Оформите заказ', text: 'На сайте или по телефону' },
        { icon: 'percent', title: 'Кредит в Kaspi', text: 'Оформление через Kaspi Bank' }, { icon: 'box', title: 'Получите прибор', text: 'Доставкой или самовывозом' }]} />
      <CallStrip icon="doc" title="Покупаете на компанию?" text="Позвоните — расскажем об условиях беспроцентной рассрочки для юрлиц." />
    </HelpLayout>
  );
}

export function MetroServicePage() {
  const go = (href: string, label: string) => <SmartLink href={href} className={s.methodBtn}>{label}<Icon name="arrowRight" size={16} stroke={2} /></SmartLink>;
  return (
    <HelpLayout title="Метрология и сервис" hero={{ art: METRO_SVG, lede: 'Ежегодная метрологическая аттестация и ремонт геодезических приборов любого уровня сложности.',
      badges: [['award', 'Сертификат за 1–2 недели'], ['doc', 'Лицензия 000764 №0146016'], ['shield', 'Сертификат Trimble']] }}>
      <Grid cols={2}>
        <Method icon="gauge" title="Метрологическая служба" text="Делаем метрологические сертификаты на всё оборудование из реестра Республики Казахстан."
          points={['Приборы нужно аттестовать каждый год', 'Сертификат готов через 1–2 недели', 'Принимаем в офисе GEOKURS или у партнёров']} action={go('/services/metrology', 'Поверочная лаборатория')} />
        <Method icon="wrench" title="Сервисный центр" text="Оснащён современным оборудованием для ремонта приборов любой сложности."
          points={['Лицензия 000764 №0146016', 'Сертификат Trimble на ремонт в Казахстане', 'Инженеры ежегодно обучаются у производителей']} action={go('/services/repair', 'Сервисный центр')} />
      </Grid>
      <Steps title="Как пройти поверку" steps={[
        { icon: 'truck', title: 'Привезите прибор', text: 'В офис GEOKURS или партнёров' }, { icon: 'gauge', title: 'Аттестация', text: 'Проверим соответствие паспортной точности' },
        { icon: 'award', title: 'Сертификат', text: 'Будет готов через 1–2 недели' }, { icon: 'wrench', title: 'Диагностика', text: 'Если точность не та — по вашему желанию' }]} />
      <Section title="Основные направления" lede="Подробности — по телефонам компании или в офисе.">
        <Grid cols={3}>
          <Note white icon="wrench" title="Гарантийный и негарантийный ремонт" text="Trimble, Nikon, Spectra Geospatial, CST/berger, Bosch; оптические нивелиры и теодолиты любых производителей." />
          <Note white icon="crosshair" title="Диагностика и юстировка" text="Геодезического оборудования любых производителей." />
          <Note white icon="award" title="Сертификат о поверке" text="Оформление метрологического сертификата." />
        </Grid>
      </Section>
    </HelpLayout>
  );
}

const REQ: [string, string][] = [['Наименование', 'ИП «GEOKURS ONLINE»'], ['Юридический адрес', 'РК, Алматинская, Алматы, Абая, дом № 150, к.н.п. 1а'], ['БИН', '880 830 300 708'],
  ['Телефон', '8 (727) 229 00 00'], ['ИИК', 'KZ20722S000008403271'], ['Банк', 'АО «Kaspi Bank»'], ['БИК', 'CASPKZKA'], ['КБе', '19']];

export function RequisitesPage() {
  const [copied, setCopied] = useState<number | 'all' | null>(null);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const copy = (key: number | 'all', text: string) => {
    try { void navigator.clipboard?.writeText(text); } catch { /* clipboard unavailable */ }
    setCopied(key);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(null), 1800);
  };
  return (
    <HelpLayout title="Банковские реквизиты" hero={{ art: DOC_SVG, lede: 'Для оплаты по счёту, договоров и закрывающих документов.', badges: [['doc', 'ИП «GEOKURS ONLINE»'], ['wallet', 'АО «Kaspi Bank»']] }}>
      <Section title="Реквизиты компании">
        <div className={s.stack}>
          <div className={s.req}>
            {REQ.map(([k, v], i) => {
              const on = copied === i;
              const label = on ? 'Скопировано' : 'Копировать';
              return (
                <div key={k} className={s.reqRow}>
                  <span className={s.reqKey}>{k}</span>
                  <span className={s.reqVal}><b>{v}</b>
                    <button type="button" aria-label={`${label}: ${k}`} className={`${s.copy} ${s.copyIcon} ${on ? s.copied : ''} mobile-only`} onClick={() => copy(i, v)}><Icon name={on ? 'check' : 'copy'} size={16} stroke={1.8} /></button>
                  </span>
                  <button type="button" aria-label={`${label}: ${k}`} className={`${s.copy} ${on ? s.copied : ''} desktop-only`} onClick={() => copy(i, v)}>{label}</button>
                </div>
              );
            })}
          </div>
          <span aria-live="polite" className="sr-only">{copied !== null ? 'Скопировано в буфер обмена' : ''}</span>
          <button type="button" className={`${s.btn} ${s.copyAll}`} onClick={() => copy('all', REQ.map(([k, v]) => `${k}: ${v}`).join('\n'))}>
            <Icon name="check" size={18} stroke={2.4} />{copied === 'all' ? 'Реквизиты скопированы' : 'Скопировать все реквизиты'}
          </button>
        </div>
      </Section>
      <Section title="Важно знать">
        <Grid cols={2}>
          <Note icon="doc" title="Нужен счёт на оплату?" text="Менеджер выставит счёт и пришлёт его на e-mail. Отправим заказ на следующий день после поступления денег." />
          <Note icon="call" title="Вопросы по документам" text={<>Бухгалтерия и менеджеры: <a href="tel:+77272290000">+7 727 229 00 00</a>, <a href="mailto:info@geokurs.kz">info@geokurs.kz</a>.</>} />
        </Grid>
      </Section>
    </HelpLayout>
  );
}
