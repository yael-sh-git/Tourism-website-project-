import jwt  from "jsonwebtoken";

export function makeToken(user)
{
  
    const token = jwt.sign({
        user_firstName: user.firstName,
        user_lastName: user.lastName,
        user_email: user.email,
        user_password: user.password
      },
      "aftg", {
        expiresIn: "7y"
      }
    );
    
    
    return token;
    
}
