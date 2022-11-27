import { verify } from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
export default (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace(/^Bearer*\s*/i, '');
  let payload;

  try {
    // попытаемся верифицировать токен
    // eslint-disable-next-line no-unused-vars
    payload = verify(token, 'some-secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
};
