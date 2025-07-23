@component('mail::message')
# New Project Member

Hello,

<strong>{{ $newUser->name }}</strong> has been joined to the project <strong>{{ $project->name }}</strong>.

You can view the project details and welcome the new member by visiting the project page.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
