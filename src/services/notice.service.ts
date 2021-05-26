import * as network from '@utils/network';
import status from 'http-status-codes';
import { Notice } from '@models/notice.model';
import { NoticeDto, NoticeListDto } from '@dto/notice.dto';
import { NoticeRepository } from '@repositories/notice.repo';

const noticeRepository = new NoticeRepository();

export class NoticeService {

    /**
     * 전체 노티스 리스트를 가져온다.
     */
    getNoticeList = async (

    ): Promise<Array<NoticeListDto>> => {
        try {
            const noticeList = await noticeRepository.getNoticeList();

            return noticeList.map((notice: Notice) => {
                return {
                    idx: notice.idx,
                    title: notice.title,
                    writer: notice.writer,
                } as NoticeListDto;
            });
        } catch (err) {
            console.log(err);
            // 진행 도중 err 발생 시, 500 반환
            return Promise.reject(
                network.FAILED_JSON(status.INTERNAL_SERVER_ERROR, err)
            );
        }
    };

    /**
     *  공지사항의 세부 정보 리스트를 가져온다.
     *
     * @param noticeIdx - 노티스 인덱스
     */
    getNotice = async (
        noticeIdx: number
    ): Promise<NoticeDto> => {
        try {
            const notice = await noticeRepository.findBynoticeIdx(noticeIdx);
            if (notice) {        
                return {
                    idx: notice.idx,
                    title: notice.title,
                    content: notice.content,
                    writer: notice.writer,
                    createAt: notice.createAt
                }
            } else
                return Promise.reject(
                    network.FAILED_JSON(status.NOT_FOUND, 'not found user')
            );
            } catch (err) {
                console.log(err);
                // 진행 도중 err 발생 시, 500 반환
                return Promise.reject(
                    network.FAILED_JSON(status.INTERNAL_SERVER_ERROR, err)
                );
        }
    };
}

