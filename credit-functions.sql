-- Function to safely deduct credits
CREATE OR REPLACE FUNCTION deduct_credits(user_id UUID, amount INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET credits = GREATEST(credits - amount, 0)
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add credits
CREATE OR REPLACE FUNCTION add_credits(user_id UUID, amount INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET credits = credits + amount
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user credits
CREATE OR REPLACE FUNCTION get_user_credits(user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  user_credits INTEGER;
BEGIN
  SELECT credits INTO user_credits
  FROM profiles
  WHERE id = user_id;
  
  RETURN COALESCE(user_credits, 0);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

