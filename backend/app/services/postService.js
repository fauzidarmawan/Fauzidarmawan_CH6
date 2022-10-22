const postRepository = require('../repositories/postRepository');

module.exports = {
    getSize(size){
        return postRepository.getSize(size)
    },

    create(body){
        return postRepository.create(body);
    },

    update(body,id){
        return postRepository.update(body,id);
    },


    getDetail(id){
        return postRepository.getById(id);
    },

    async list(){
        try{
            const post  = await postRepository.getAll();
            const total = await postRepository.getTotalCount();

            return{
                data: post,
                count: total
            }
        }catch (err){
            throw err;
        }
    },

    delete(id){
        return postRepository.delete(id);
    },
}