import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from './Hash.service';
import { ReqNothingDto } from './dtos';
import { ManagerRepository } from './repository/ManagerRepository.memory';
@Injectable()
export class ManageService {
  constructor(private readonly hashService: HashService) {}
  /* 아래 코드는 DB 연동 이후 삭제 됩니다. */
  managerRepository = new ManagerRepository();

  verify(request: ReqNothingDto) {
    const passward = request.passward;
    const saved = this.managerRepository.getThat();
    if (saved !== this.hashService.generateSha256Hash(passward)) {
      throw new HttpException('비밀번호 오류', HttpStatus.FORBIDDEN);
    }
  }
}
