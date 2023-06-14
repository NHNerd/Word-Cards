class UserDto {
  email;
  id;
  isActivated;

  constructor(model) {
    this.email = model.email;
    this.id = model._id; //? ModgoDB adding '_'(field is permanent) before id in default
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
