CREATE TABLE shopping_lists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  active BOOLEAN DEFAULT TRUE
);

CREATE TABLE shopping_list_items (
  id SERIAL PRIMARY KEY,
  shopping_list_id INTEGER REFERENCES shopping_lists(id),
  name TEXT NOT NULL,
  collected BOOLEAN DEFAULT FALSE
);

INSERT INTO shopping_lists (name, active ) VALUES ('Shopping List 1', true);
INSERT INTO shopping_lists (name, active ) VALUES ('Shopping List 2', true);
INSERT INTO shopping_lists (name, active ) VALUES ('Shopping List 3', false);
INSERT INTO shopping_lists (name, active ) VALUES ('Shopping List 4', true);
INSERT INTO shopping_lists (name, active ) VALUES ('Shopping List 5', false);

INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (1, 'Item 1', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (1, 'Item 2', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (1, 'Item 3', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (1, 'Item 4', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (1, 'Item 5', false);
 
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (2, 'Item 1', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (2, 'Item 2', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (2, 'Item 3', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (2, 'Item 4', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (2, 'Item 5', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (3, 'Item 1', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (3, 'Item 2', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (3, 'Item 3', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (3, 'Item 4', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (3, 'Item 5', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (4, 'Item 1', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (4, 'Item 2', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (4, 'Item 3', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (4, 'Item 4', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (4, 'Item 5', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (5, 'Item 1', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (5, 'Item 2', false);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (5, 'Item 3', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (5, 'Item 4', true);
INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (5, 'Item 5', false);

