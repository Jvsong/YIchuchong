import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from '@/lib/admin-auth';
import { writeData } from '@/lib/dataStore';
import { DATA_TYPE_KEYS, type EditableType } from '@/config';
import { getCollection } from '@/lib/content';

function isEditableType(type: string): type is EditableType {
  return (DATA_TYPE_KEYS as readonly string[]).includes(type);
}

function isAuthorized(): boolean {
  return cookies().get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}

export async function GET(_request: Request, { params }: { params: { type: string } }) {
  if (!isAuthorized()) {
    return NextResponse.json({ message: '未授权' }, { status: 401 });
  }
  if (!isEditableType(params.type)) {
    return NextResponse.json({ message: '未知类型' }, { status: 400 });
  }
  return NextResponse.json(getCollection(params.type));
}

export async function PUT(request: Request, { params }: { params: { type: string } }) {
  if (!isAuthorized()) {
    return NextResponse.json({ message: '未授权' }, { status: 401 });
  }
  if (!isEditableType(params.type)) {
    return NextResponse.json({ message: '未知类型' }, { status: 400 });
  }
  try {
    const data = await request.json();
    if (!Array.isArray(data)) {
      return NextResponse.json({ message: '数据格式错误' }, { status: 400 });
    }
    writeData(params.type, data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: '解析失败' }, { status: 400 });
  }
}
