-- Dummy Data goes here. 

INSERT INTO users (id, email, password)
VALUES (1,'test@test.com','password');

INSERT INTO users (id, email, password)
VALUES (2,'Testing-again@test.com', 'password1');

INSERT INTO categories (category_id, name)
VALUES (1, 'Test-Category');

INSERT INTO categories (category_id, name)
VALUES (2, 'Non-essential Good');

INSERT INTO payments (user_id, category_id, name, amount, is_additive, payment_id)
VALUES (1, 1, 'Test Payment', 100, false, 1);


INSERT INTO payments (user_id, category_id, name, amount, is_additive, payment_id)
VALUES ( 2, 2, 'Test Payment 2', 15, true, 2);