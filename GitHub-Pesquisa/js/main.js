$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;
        //Requerindo do Github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: 'e020273ec6cfc2524298',
                client_secret: '55657519688d212821402c95860a9d409e590041',
            }
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: 'e020273ec6cfc2524298',
                    client_secret: '55657519688d212821402c95860a9d409e590041',
                    sort: 'created: asc',
                }
            }).done(function(repos){
               $.each(repos, function(index, repo){
                
                  const count = 5
                   $('#repos').append(`
                    <div class="well">
                        <div class="row row-div">
                            <div class ="col-md-7">
                                <strong>${repo.name}</strong>
                            </div>
                            <div class ="col-md-2">
                                <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                                <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                            </div>
                            <div class ="col-md-2">
                                <a href="${repo.html_url}" target="_blank" class="btn btn-info">Link para a Pagina</a><br>
                            </div>
                        </div>
                    </div>
                   `);
               })
            })
                        $('#profile').html(`
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"><strong>${user.name}<strong></h3>
              </div>
              <div class="panel-body">
                <div class ="row">
                        <div class="col-md-3">
                        <img class="thumbnail avatar" src="${user.avatar_url}">
                        <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">Perfil</a>
                        </div>
                        <div class="col-md-7">
                            <span class="badge badge-primary">Repositórios: ${user.public_repos}</span>
                            <span class="badge badge-success">Seguidores: ${user.followers}</span>
                            <span class="badge badge-danger">Seguindo: ${user.following}</span>
                        <br>
                        <ul class = "list-group">
                            <li class ="list-group-item"><strong>Locação:<strong> ${user.location}</li>
                            <li class ="list-group-item"><strong>Membro Desde:<strong> ${user.created_at}</li>
                            <li class ="list-group-item"><strong>Repositórios:<strong>  ${user.repos_url}</li>
                            <li class ="list-group-item"><strong>Pagina de Seguidores:<strong> ${user.followers_url}</li>
                            <li class ="list-group-item"><strong>Seguidores:<strong> ${user.followers}</li>
                            <li class ="list-group-item"><strong>Seguindo:<strong> ${user.following}</li>
                        </ul>
                        </div>   
                </div>
              </div>
            </div>
            <h3 class ="page-header">Repositórios:</h3>
                        <div id ="repos"></div>
                        `);
                    });
                });

            });